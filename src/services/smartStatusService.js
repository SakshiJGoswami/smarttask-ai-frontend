// src/services/smartStatusService.js
// Frontend-only heuristic service (mockable). Keep it pure so backend can reuse easily later.

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  DONE: "done",
  BLOCKED: "blocked",
};

function extractTaskIdsFromText(text = "") {
  // simple pattern: task#<id> or #<id> or task:<id>
  const ids = new Set();
  const regexes = [/task#(\w+)/gi, /#(\w+)/gi, /task[: ](\w+)/gi];
  regexes.forEach((r) => {
    let m;
    while ((m = r.exec(text))) ids.add(m[1]);
  });
  return Array.from(ids);
}

/**
 * Analyze an activity and return suggested task status updates (do not mutate tasks here).
 * activity: { type: 'commit'|'comment'|'issue'|'manual', actor, message, metadata }
 */
export function analyzeActivity(activity = {}) {
  const suggestions = []; // { taskId, from, to, reason, confidence }

  const { type, message = "", metadata = {} } = activity;

  // find possible task ids mentioned
  const mentioned = extractTaskIdsFromText(message || metadata?.title || "");

  // Heuristic rules:
  if (type === "commit") {
    // commit message containing "fix", "close", "resolve" likely moves to IN_REVIEW or DONE
    const lower = message.toLowerCase();
    const isFix = /\b(fix|fixes|fixed|close|closes|closed|resolve|resolves|resolved)\b/.test(lower);
    mentioned.forEach((tid) => {
      if (isFix) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_REVIEW,
          reason: `Commit suggests work completed ("${message.slice(0, 80)}")`,
          confidence: 0.7,
        });
      } else {
        // generic commit -> maybe in progress
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_PROGRESS,
          reason: `Commit referencing task (#${tid})`,
          confidence: 0.5,
        });
      }
    });
  }

  if (type === "comment") {
    const lower = message.toLowerCase();
    mentioned.forEach((tid) => {
      if (/\b(block|blocked|can't|cannot|stuck|stuck on)\b/.test(lower)) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.BLOCKED,
          reason: `Comment signals a blocker: "${message.slice(0,80)}"`,
          confidence: 0.9,
        });
      } else if (/\b(review|pr|pull request|please review|rfr)\b/.test(lower)) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_REVIEW,
          reason: `Comment requests review.`,
          confidence: 0.8,
        });
      } else if (/\b(done|completed|finished)\b/.test(lower)) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.DONE,
          reason: `Comment claims completion.`,
          confidence: 0.85,
        });
      }
    });
  }

  if (type === "issue") {
    // label-based inference
    const labels = metadata.labels || [];
    mentioned.forEach((tid) => {
      if (labels.includes("high-priority") || labels.includes("urgent")) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_PROGRESS,
          reason: `Issue labeled high-priority`,
          confidence: 0.6,
        });
      }
    });
  }

  // fallback: if metadata has taskId directly
  if (metadata?.taskId && suggestions.every(s => s.taskId !== metadata.taskId)) {
    suggestions.push({
      taskId: metadata.taskId,
      from: null,
      to: TASK_STATUS.IN_PROGRESS,
      reason: `Linked activity`,
      confidence: 0.4,
    });
  }

  return suggestions;
}

/**
 * Calculate workload per user from tasks list.
 * tasks: array of { id, assigneeId, status, estimateHours (optional) }
 * returns: { userId: { openCount, totalEstimate } }
 */
export function calculateWorkload(tasks = []) {
  const map = {};
  tasks.forEach((t) => {
    const uid = t.assigneeId || "unassigned";
    if (!map[uid]) map[uid] = { openCount: 0, totalEstimate: 0, tasks: [] };
    const isOpen = t.status !== TASK_STATUS.DONE;
    if (isOpen) {
      map[uid].openCount += 1;
      map[uid].totalEstimate += Number(t.estimateHours || 1);
      map[uid].tasks.push(t);
    }
  });
  return map;
}

/**
 * Suggest reassignments: naive heuristic
 * - Compute average workload
 * - Flag users > (avg * threshold) as overloaded
 * - Find user(s) < (avg * lowerThreshold) as candidates
 */
export function suggestReassignments(tasks = [], users = [], options = {}) {
  const threshold = options.threshold || 1.4; // overloaded > 140% of avg
  const lowerThreshold = options.lowerThreshold || 0.8; // underloaded < 80% of avg

  const workload = calculateWorkload(tasks);
  const userIds = users.map(u => u.id);
  // ensure all users appear
  userIds.forEach(uid => { if (!workload[uid]) workload[uid] = { openCount: 0, totalEstimate:0, tasks: [] }; });

  const totals = Object.values(workload).map(w => w.totalEstimate || 0);
  const avg = totals.reduce((a,b)=>a+b,0) / Math.max(1, totals.length);

  const overloaded = [];
  const underloaded = [];
  Object.entries(workload).forEach(([uid, w]) => {
    if (w.totalEstimate > avg * threshold) overloaded.push({ userId: uid, ...w });
    else if (w.totalEstimate < avg * lowerThreshold) underloaded.push({ userId: uid, ...w });
  });

  // propose moving smallest tasks from overloaded to underloaded
  const proposals = [];
  overloaded.forEach(o => {
    const candidates = underloaded.sort((a,b)=>a.totalEstimate - b.totalEstimate);
    if (candidates.length === 0) return;
    // pick one small task from overloaded (smallest estimate)
    const smallTask = (o.tasks || []).sort((a,b)=> (a.estimateHours||1)-(b.estimateHours||1))[0];
    if (!smallTask) return;
    const target = candidates[0].userId;
    proposals.push({
      from: o.userId,
      to: target,
      taskId: smallTask.id,
      reason: `Balance load: ${o.totalEstimate}h -> ${candidates[0].totalEstimate}h (avg ${avg.toFixed(1)}h)`,
      confidence: 0.6,
    });
  });

  return { avg, overloaded, underloaded, proposals };
}

export default {
  analyzeActivity,
  calculateWorkload,
  suggestReassignments,
  TASK_STATUS,
};
