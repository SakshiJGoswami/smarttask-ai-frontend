// src/components/smart/SmartStatusPanel.jsx
import React, { useEffect, useState } from "react";
import smartService from "../../services/smartStatusService";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

/**
 * Simple panel showing smart suggestions (client-side).
 * This does not auto-change tasks unless manager clicks Apply.
 */
export default function SmartStatusPanel({ activities = [] }) {
  const { tasks, updateTask } = useTasks();
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // analyze activities and produce suggestions
    const all = [];
    activities.forEach(act => {
      const s = smartService.analyzeActivity(act);
      s.forEach(sig => all.push(sig));
    });
    setSuggestions(all);
    // compute reassign proposals
    // NOTE: transform tasks to minimal shape for the service
    const tlist = tasks.map(t => ({
      id: t.id, assigneeId: t.assigneeId, status: t.status, estimateHours: t.estimateHours || 1
    }));
    // users list should ideally come from context; for demo we'll assume user roster in window.__USERS__
    const users = window.__USERS__ || [];
    const r = smartService.suggestReassignments(tlist, users);
    setProposals(r.proposals || []);
  }, [activities, tasks]);

  if (!user || user.role === "employee") return null; // only show to manager/admin

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold">Smart Suggestions</h3>

      <div className="mt-3">
        {suggestions.length === 0 ? (
          <div className="text-sm text-muted">No automatic status suggestions yet.</div>
        ) : (
          suggestions.map((s, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <div><strong>Task:</strong> {s.taskId} • <strong>Suggest:</strong> {s.to}</div>
              <div className="text-sm">{s.reason}</div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    // call updateTask to change status — TaskContext must accept partial updates
                    updateTask(s.taskId, { status: s.to });
                    // remove applied suggestion locally
                    setSuggestions(prev => prev.filter((_,i) => i !== idx));
                  }}
                  className="px-2 py-1 rounded bg-green-500 text-white text-sm"
                >Apply</button>

                <button
                  onClick={() => setSuggestions(prev => prev.filter((_,i) => i !== idx))}
                  className="px-2 py-1 rounded border text-sm"
                >Ignore</button>
              </div>
            </div>
          ))
        )}
      </div>

      <hr className="my-3" />

      <h4 className="font-medium">Workload balancing proposals</h4>
      <div className="mt-2">
        {proposals.length === 0 ? (
          <div className="text-sm text-muted">No reassign suggestions right now.</div>
        ) : proposals.map((p, i) => (
          <div key={i} className="mb-2 p-2 border rounded">
            <div>Move <strong>{p.taskId}</strong> from <strong>{p.from}</strong> → <strong>{p.to}</strong></div>
            <div className="text-sm">{p.reason}</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  // call updateTask to reassign — TaskContext must accept assigneeId update
                  updateTask(p.taskId, { assigneeId: p.to });
                  setProposals(prev => prev.filter((_,j)=>j!==i));
                }}
                className="px-2 py-1 rounded bg-indigo-600 text-white text-sm"
              >Reassign</button>
              <button
                onClick={() => setProposals(prev => prev.filter((_,j)=>j!==i))}
                className="px-2 py-1 rounded border text-sm"
              >Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
