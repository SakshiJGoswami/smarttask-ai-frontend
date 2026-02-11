// src/components/smart/SmartStatusPanel.jsx
import React, { useEffect, useState } from "react";
import smartService from "../../services/smartStatusService";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

export default function SmartStatusPanel({ activities = [] }) {
  const { tasks, updateTask } = useTasks();
  const { user } = useAuth();

  const [suggestions, setSuggestions] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    /* ---------------- ANALYZE ACTIVITIES ---------------- */
    const allSignals = [];

    activities.forEach((act) => {
      const signals = smartService.analyzeActivity(act);
      signals.forEach((sig) => allSignals.push(sig));
    });

    setSuggestions(allSignals);

    /* ---------------- WORKLOAD BALANCING ---------------- */

    // ✅ Transform Mongo tasks → minimal shape for service
    const tlist = tasks.map((t) => ({
      id: t._id,
      assigneeId: t.assignedTo?._id || t.assignedTo,
      status: t.status,
      estimateHours: t.estimateHours || 1,
    }));

    const users = window.__USERS__ || [];

    const result = smartService.suggestReassignments(tlist, users);

    setProposals(result.proposals || []);
  }, [activities, tasks]);

  // ✅ Only admin / manager
  if (!user || user.role === "employee") return null;

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold">
        Smart Suggestions
      </h3>

      {/* ---------------- STATUS SUGGESTIONS ---------------- */}

      <div className="mt-3">
        {suggestions.length === 0 ? (
          <div className="text-sm text-muted">
            No automatic status suggestions yet.
          </div>
        ) : (
          suggestions.map((s, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <div>
                <strong>Task:</strong> {s.taskId} •{" "}
                <strong>Suggest:</strong> {s.to}
              </div>

              <div className="text-sm">
                {s.reason}
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    updateTask(s.taskId, { status: s.to });

                    setSuggestions((prev) =>
                      prev.filter((_, i) => i !== idx)
                    );
                  }}
                  className="px-2 py-1 rounded bg-green-500 text-white text-sm"
                >
                  Apply
                </button>

                <button
                  onClick={() =>
                    setSuggestions((prev) =>
                      prev.filter((_, i) => i !== idx)
                    )
                  }
                  className="px-2 py-1 rounded border text-sm"
                >
                  Ignore
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <hr className="my-3" />

      {/* ---------------- REASSIGN PROPOSALS ---------------- */}

      <h4 className="font-medium">
        Workload balancing proposals
      </h4>

      <div className="mt-2">
        {proposals.length === 0 ? (
          <div className="text-sm text-muted">
            No reassign suggestions right now.
          </div>
        ) : (
          proposals.map((p, i) => (
            <div key={i} className="mb-2 p-2 border rounded">
              <div>
                Move <strong>{p.taskId}</strong> from{" "}
                <strong>{p.from}</strong> →{" "}
                <strong>{p.to}</strong>
              </div>

              <div className="text-sm">
                {p.reason}
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    updateTask(p.taskId, {
                      assignedTo: p.to,
                    });

                    setProposals((prev) =>
                      prev.filter((_, j) => j !== i)
                    );
                  }}
                  className="px-2 py-1 rounded bg-indigo-600 text-white text-sm"
                >
                  Reassign
                </button>

                <button
                  onClick={() =>
                    setProposals((prev) =>
                      prev.filter((_, j) => j !== i)
                    )
                  }
                  className="px-2 py-1 rounded border text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
