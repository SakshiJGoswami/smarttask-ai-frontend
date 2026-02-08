import DashboardLayout from "../../layouts/DashboardLayout";
import AIInsightCard from "../../components/ai/AIInsightCard";
import { useAIInsights } from "../../components/ai/useAIInsights";
import ActivityTimeline from "../../components/activity/ActivityTimeline";
import { useTasks } from "../../context/TaskContext";
import { useState } from "react";

/* -------------------- COMPONENTS -------------------- */

function StatCard({ title, value, accent }) {
  return (
    <div className="
      bg-lightSurface border border-lightBorder
      dark:bg-card dark:border-border
      rounded-2xl p-5
    ">
      <p className="text-sm text-lightMuted dark:text-gray-400 mb-2">
        {title}
      </p>
      <h2 className={`text-3xl font-semibold ${accent}`}>
        {value}
      </h2>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-lightBorder dark:bg-border rounded-full h-3">
      <div
        className="bg-primary h-3 rounded-full transition-all"
        style={{ width: value }}
      />
    </div>
  );
}

function TaskRow({ id, title, status, due, priority, onStatusChange }) {
  return (
    <div className="
      flex justify-between items-center
      bg-lightCard border border-lightBorder
      dark:bg-surface dark:border-border
      rounded-xl p-4
    ">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Due: {due || "—"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className="text-sm rounded-lg px-2 py-1 border"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <span className="text-xs px-3 py-1 rounded-full bg-lightBorder dark:bg-border">
          {priority}
        </span>
      </div>
    </div>
  );
}

/* -------------------- PAGE -------------------- */

export default function EmployeeDashboard() {
  const aiInsights = useAIInsights("employee", "dashboard");
  const { tasks, updateTask } = useTasks();
  const [toast, setToast] = useState("");

  const myTasks = tasks.filter(
    (t) => t.assignedTo === "employee"
  );

  const completedTasks = myTasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const productivity =
    myTasks.length === 0
      ? "0%"
      : `${Math.round((completedTasks / myTasks.length) * 100)}%`;

  const highPriorityToday = myTasks.filter(
    (t) => t.priority === "High"
  ).length;

  const handleStatusChange = (taskId, status) => {
    updateTask(taskId, { status });
    setToast("Task status updated successfully");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">
          My Dashboard
        </h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Focus on today’s priorities and track your progress.
        </p>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 text-sm">
          {toast}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Completed Tasks" value={completedTasks} accent="text-green-600" />
        <StatCard title="Total Tasks" value={myTasks.length} accent="text-cyan-600" />
        <StatCard title="Productivity" value={productivity} accent="text-indigo-600" />
        <StatCard
          title="Focus Level"
          value={highPriorityToday > 0 ? "High" : "Normal"}
          accent="text-purple-600"
        />
      </div>

      {/* PRODUCTIVITY VISUAL */}
      <div className="mt-6 bg-lightSurface border rounded-2xl p-5">
        <p className="text-sm mb-2">Productivity Progress</p>
        <ProgressBar value={productivity} />
      </div>

      {/* AI INSIGHTS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiInsights.map((item, i) => (
          <AIInsightCard key={i} {...item} />
        ))}
      </div>

      {/* TODAY FOCUS */}
      <div className="mt-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">🎯 Today’s Focus</h2>
        <p className="text-sm">
          You have <strong>{highPriorityToday}</strong> high-priority task(s).
        </p>
      </div>

      {/* ACTIVITY */}
      <div className="mt-10">
        <ActivityTimeline />
      </div>

      {/* MY TASKS */}
      <div className="mt-10 bg-lightSurface border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">My Tasks</h2>

        {myTasks.length === 0 ? (
          <p className="text-lightMuted">No tasks assigned</p>
        ) : (
          <div className="space-y-4">
            {myTasks.map((task) => (
              <TaskRow
                key={task.id}
                {...task}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
