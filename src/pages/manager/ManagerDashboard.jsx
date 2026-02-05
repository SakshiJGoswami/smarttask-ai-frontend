import DashboardLayout from "../../layouts/DashboardLayout";
// OPTIONAL ONLY
import { Link } from "react-router-dom";

/* -------------------- MOCK DATA -------------------- */

const projects = [
  { name: "SmartTask AI", progress: 72, status: "On Track" },
  { name: "Client CRM System", progress: 45, status: "At Risk" },
];

const teamTasks = [
  { title: "Design Dashboard UI", assignee: "Alice", status: "In Progress", priority: "High" },
  { title: "API Integration", assignee: "Bob", status: "Pending", priority: "Medium" },
  { title: "Fix Auth Bugs", assignee: "Charlie", status: "Completed", priority: "Low" },
];

/* -------------------- PAGE -------------------- */

export default function ManagerDashboard() {
  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Manager Dashboard</h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Overview of your projects and team tasks
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value="5" />
        <StatCard title="Total Tasks" value="38" />
        <StatCard title="Completed" value="21" accent="text-green-600 dark:text-green-400" />
        <StatCard title="At Risk" value="2" accent="text-red-600 dark:text-red-400" />
      </div>

      {/* PROJECTS OVERVIEW */}
      <div className="
        mt-10 bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-6
      ">
        <h2 className="text-lg font-semibold mb-6">My Projects</h2>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectRow key={index} {...project} />
          ))}
        </div>
      </div>

      {/* TEAM TASKS */}
      <div className="
        mt-10 bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-6
      ">
        <h2 className="text-lg font-semibold mb-6">Team Tasks</h2>

        <div className="space-y-4">
          {teamTasks.map((task, index) => (
            <TaskRow key={index} {...task} />
          ))}
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="
        mt-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10
        border border-lightBorder dark:border-border
        rounded-2xl p-6
      ">
        <h2 className="text-lg font-semibold mb-2">
          🤖 AI Insights (Preview)
        </h2>
        <p className="text-sm text-lightText dark:text-gray-300">
          Your team is performing well, but 2 tasks are at risk due to upcoming
          deadlines. Consider reallocating workload.
        </p>
      </div>
    </DashboardLayout>
  );
}

/* -------------------- COMPONENTS -------------------- */

function StatCard({ title, value, accent = "text-primary" }) {
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

function ProjectRow({ name, progress, status }) {
  const statusColor =
    status === "On Track"
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div className="
      flex justify-between items-center
      bg-lightCard border border-lightBorder
      dark:bg-surface dark:border-border
      rounded-xl p-4
    ">
      <div>
        <p className="font-medium">{name}</p>
        <p className={`text-sm ${statusColor}`}>{status}</p>
      </div>

      <div className="w-40">
        <div className="h-2 bg-lightBorder dark:bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-lightMuted dark:text-gray-400 mt-1">
          {progress}% complete
        </p>
      </div>
    </div>
  );
}

function TaskRow({ title, assignee, status, priority }) {
  const statusColor =
    status === "Completed"
      ? "text-green-600 dark:text-green-400"
      : status === "In Progress"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-lightMuted dark:text-gray-400";

  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      : priority === "Medium"
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
      : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";

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
          Assigned to {assignee}
        </p>
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
