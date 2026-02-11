// src/services/smartStatusService.js

export const TASK_STATUS = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Progress", // backend-safe fallback
  DONE: "Completed",
  BLOCKED: "Blocked",
};

function extractTaskIdsFromText(text = "") {
  const ids = new Set();
  const regexes = [/task#(\w+)/gi, /#(\w+)/gi, /task[: ](\w+)/gi];

  regexes.forEach((r) => {
    let m;
    while ((m = r.exec(text))) ids.add(m[1]);
  });

  return Array.from(ids);
}

/* ---------------- ACTIVITY ANALYSIS ---------------- */

export function analyzeActivity(activity = {}) {
  const suggestions = [];

  const { type, message = "", metadata = {} } = activity;

  const mentioned = extractTaskIdsFromText(
    message || metadata?.title || ""
  );

  if (type === "commit") {
    const lower = message.toLowerCase();

    const isFix =
      /\b(fix|fixes|fixed|close|closes|closed|resolve|resolved)\b/.test(
        lower
      );

    mentioned.forEach((tid) => {
      if (isFix) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_PROGRESS,
          reason: `Commit suggests work completed`,
          confidence: 0.7,
        });
      } else {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_PROGRESS,
          reason: `Commit referencing task`,
          confidence: 0.5,
        });
      }
    });
  }

  if (type === "comment") {
    const lower = message.toLowerCase();

    mentioned.forEach((tid) => {
      if (/\b(block|blocked|stuck|cannot|can't)\b/.test(lower)) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.BLOCKED,
          reason: `Comment signals blocker`,
          confidence: 0.9,
        });
      } else if (/\b(review|pr|pull request)\b/.test(lower)) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_PROGRESS,
          reason: `Comment requests review`,
          confidence: 0.8,
        });
      } else if (/\b(done|completed|finished)\b/.test(lower)) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.DONE,
          reason: `Comment claims completion`,
          confidence: 0.85,
        });
      }
    });
  }

  if (type === "issue") {
    const labels = metadata.labels || [];

    mentioned.forEach((tid) => {
      if (
        labels.includes("high-priority") ||
        labels.includes("urgent")
      ) {
        suggestions.push({
          taskId: tid,
          from: null,
          to: TASK_STATUS.IN_PROGRESS,
          reason: `High priority issue`,
          confidence: 0.6,
        });
      }
    });
  }

  if (
    metadata?.taskId &&
    suggestions.every((s) => s.taskId !== metadata.taskId)
  ) {
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

/* ---------------- WORKLOAD ---------------- */

export function calculateWorkload(tasks = []) {
  const map = {};

  tasks.forEach((t) => {
    const uid = t.assigneeId || "unassigned";

    if (!map[uid])
      map[uid] = {
        openCount: 0,
        totalEstimate: 0,
        tasks: [],
      };

    const isOpen = t.status !== TASK_STATUS.DONE;

    if (isOpen) {
      map[uid].openCount += 1;
      map[uid].totalEstimate += Number(
        t.estimateHours || 1
      );
      map[uid].tasks.push(t);
    }
  });

  return map;
}

/* ---------------- REASSIGNMENT ---------------- */

export function suggestReassignments(
  tasks = [],
  users = [],
  options = {}
) {
  const threshold = options.threshold || 1.4;
  const lowerThreshold = options.lowerThreshold || 0.8;

  const workload = calculateWorkload(tasks);

  const userIds = users.map((u) => u.id);

  userIds.forEach((uid) => {
    if (!workload[uid])
      workload[uid] = {
        openCount: 0,
        totalEstimate: 0,
        tasks: [],
      };
  });

  const totals = Object.values(workload).map(
    (w) => w.totalEstimate || 0
  );

  const avg =
    totals.reduce((a, b) => a + b, 0) /
    Math.max(1, totals.length);

  const overloaded = [];
  const underloaded = [];

  Object.entries(workload).forEach(([uid, w]) => {
    if (w.totalEstimate > avg * threshold)
      overloaded.push({ userId: uid, ...w });
    else if (w.totalEstimate < avg * lowerThreshold)
      underloaded.push({ userId: uid, ...w });
  });

  const proposals = [];

  overloaded.forEach((o) => {
    const candidates = underloaded.sort(
      (a, b) => a.totalEstimate - b.totalEstimate
    );

    if (candidates.length === 0) return;

    const smallTask = (o.tasks || []).sort(
      (a, b) =>
        (a.estimateHours || 1) -
        (b.estimateHours || 1)
    )[0];

    if (!smallTask) return;

    proposals.push({
      from: o.userId,
      to: candidates[0].userId,
      taskId: smallTask.id,
      reason: `Balance workload`,
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
