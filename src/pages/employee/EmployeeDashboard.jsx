import DashboardLayout from "../../layouts/DashboardLayout";
import AIInsightCard from "../../components/ai/AIInsightCard";
import { useAIInsights } from "../../components/ai/useAIInsights";
import ActivityTimeline from "../../components/activity/ActivityTimeline";

/* -------------------- COMPONENTS FIRST -------------------- */

function StatCard({ title, value, accent }) {
  return (
    <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-5 shadow-glass">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <h2 className={`text-3xl font-semibold ${accent}`}>{value}</h2>
    </div>
  );
}

function TaskRow({ title, status, due, priority }) {
  const statusColor =
    status === "Completed"
      ? "text-green-400"
      : status === "In Progress"
      ? "text-yellow-400"
      : "text-gray-400";

  const priorityColor =
    priority === "High"
      ? "bg-red-500/20 text-red-400"
      : priority === "Medium"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-green-500/20 text-green-400";

  return (
    <div className="flex justify-between items-center bg-surface border border-border rounded-xl p-4">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">Due: {due}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm ${statusColor}`}>{status}</span>
        <span className={`px-3 py-1 rounded-full text-xs ${priorityColor}`}>
          {priority}
        </span>
      </div>
    </div>
  );
}

/* -------------------- MOCK DATA -------------------- */

const myTasks = [
  {
    title: "Fix Login Validation",
    status: "In Progress",
    due: "Today",
    priority: "High",
  },
  {
    title: "Update Task UI",
    status: "Pending",
    due: "Tomorrow",
    priority: "Medium",
  },
  {
    title: "Write API Docs",
    status: "Completed",
    due: "Yesterday",
    priority: "Low",
  },
];

const productivity = {
  completed: 18,
  pending: 6,
  streak: 5,
};

/* -------------------- PAGE -------------------- */

export default function EmployeeDashboard() {
  const aiInsights = useAIInsights("employee", "dashboard");

  return (
    <DashboardLayout role="employee">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">My Dashboard</h1>
        <p className="text-sm text-gray-400">
          Focus on today’s priorities and track your progress.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Completed Tasks" value={productivity.completed} accent="text-green-400" />
        <StatCard title="Pending Tasks" value={productivity.pending} accent="text-yellow-400" />
        <StatCard title="Daily Streak" value={`${productivity.streak} days`} accent="text-cyan-400" />
        <StatCard title="Focus Level" value="High" accent="text-purple-400" />
      </div>

      {/* AI INSIGHTS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiInsights.map((item, i) => (
          <AIInsightCard key={i} {...item} />
        ))}
      </div>

      {/* TODAY FOCUS */}
      <div className="mt-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">🎯 Today’s Focus</h2>
        <p className="text-sm text-gray-300">
          You have <strong>1 high-priority task</strong> due today.
        </p>
      </div>

      {/* ACTIVITY TIMELINE */}
      <div className="mt-10">
        <ActivityTimeline />
      </div>

      {/* MY TASKS */}
      <div className="mt-10 bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6">My Tasks</h2>

        <div className="space-y-4">
          {myTasks.map((task, index) => (
            <TaskRow key={index} {...task} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
