import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import SmartStatusPanel from "../../components/smart/SmartStatusPanel";

/* -------------------- PAGE -------------------- */

export default function ManagerDashboard() {
  const { projects } = useProjects();
  const { tasks } = useTasks();

  /* ---------- NORMALIZE STATUS (frontend only) ---------- */
  const normalizeStatus = (status) => {
    if (!status) return "todo";
    const s = status.toLowerCase();
    if (s.includes("progress")) return "in_progress";
    if (s.includes("complete")) return "done";
    if (s.includes("block")) return "blocked";
    return "todo";
  };

  const normalizedTasks = tasks.map((t) => ({
    ...t,
    _status: normalizeStatus(t.status),
  }));

  /* ---------- METRICS ---------- */
  const activeProjects = projects.filter(
    (p) => p.status !== "Completed"
  );

  const totalTasks = normalizedTasks.length;

  const completedTasks = normalizedTasks.filter(
    (t) => t._status === "done"
  ).length;

  const atRiskProjects = projects.filter(
    (p) => p.status === "On Hold"
  ).length;

  /* ---------- WORKLOAD CALCULATION (FRONTEND ONLY) ---------- */
  const workloadMap = {};
  normalizedTasks.forEach((task) => {
    const user = task.assignedTo || "Unassigned";
    if (!workloadMap[user]) workloadMap[user] = 0;
    if (task._status !== "done") {
      workloadMap[user] += 1;
    }
  });

  const workloadEntries = Object.entries(workloadMap);
  const overloadedUsers = workloadEntries.filter(
    ([, count]) => count > 5
  );

  /* ---------- MOCK ACTIVITIES ---------- */
  const activities = window.__ACTIVITIES__ || [];

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">
          Manager Dashboard
        </h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Overview of your projects and team tasks
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value={activeProjects.length} />
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          accent="text-green-600 dark:text-green-400"
        />
        <StatCard
          title="At Risk Projects"
          value={atRiskProjects}
          accent="text-red-600 dark:text-red-400"
        />
      </div>

      {/* SMART SUGGESTIONS */}
      <div className="mt-10">
        <SmartStatusPanel activities={activities} />
      </div>

      {/* WORKLOAD VIEW (NEW) */}
      <div
        className="
          mt-10 bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl p-6
        "
      >
        <h2 className="text-lg font-semibold mb-4">
          Team Workload Overview
        </h2>

        {workloadEntries.length === 0 ? (
          <p className="text-lightMuted">
            No workload data available
          </p>
        ) : (
          <div className="space-y-3">
            {workloadEntries.map(([user, count]) => (
              <div
                key={user}
                className="flex justify-between items-center"
              >
                <span className="text-sm">
                  {user}
                </span>
                <span
                  className={`text-sm font-medium ${
                    count > 5
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {count} active task(s)
                </span>
              </div>
            ))}
          </div>
        )}

        {overloadedUsers.length > 0 && (
          <p className="text-xs text-red-400 mt-4">
            ⚠ Some team members may be overloaded.
            Consider redistributing tasks.
          </p>
        )}
      </div>

      {/* PROJECTS OVERVIEW */}
      <div
        className="
          mt-10 bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl p-6
        "
      >
        <h2 className="text-lg font-semibold mb-6">
          My Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-lightMuted">
            No projects available
          </p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                {...project}
              />
            ))}
          </div>
        )}
      </div>

      {/* TEAM TASKS */}
      <div
        className="
          mt-10 bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl p-6
        "
      >
        <h2 className="text-lg font-semibold mb-6">
          Team Tasks
        </h2>

        {normalizedTasks.length === 0 ? (
          <p className="text-lightMuted">
            No tasks found
          </p>
        ) : (
          <div className="space-y-4">
            {normalizedTasks.map((task) => (
              <TaskRow
                key={task.id}
                {...task}
              />
            ))}
          </div>
        )}
      </div>

      {/* AI INSIGHTS PREVIEW */}
      <div
        className="
          mt-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10
          border border-lightBorder dark:border-border
          rounded-2xl p-6
        "
      >
        <h2 className="text-lg font-semibold mb-2">
          🤖 AI Insights (Preview)
        </h2>
        <p className="text-sm text-lightText dark:text-gray-300">
          AI analyzes task activity and workload to assist
          managerial decisions. Suggestions are advisory only.
        </p>
      </div>
    </DashboardLayout>
  );
}

/* -------------------- COMPONENTS -------------------- */

function StatCard({ title, value, accent = "text-primary" }) {
  return (
    <div
      className="
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-5
      "
    >
      <p className="text-sm text-lightMuted dark:text-gray-400 mb-2">
        {title}
      </p>
      <h2 className={`text-3xl font-semibold ${accent}`}>
        {value}
      </h2>
    </div>
  );
}

function ProjectRow({ id, name, status }) {
  const statusColor =
    status === "Active"
      ? "text-green-600 dark:text-green-400"
      : status === "Completed"
      ? "text-cyan-600 dark:text-cyan-400"
      : "text-red-600 dark:text-red-400";

  return (
    <Link
      to={`/projects/${id}`}
      className="
        flex justify-between items-center
        bg-lightCard border border-lightBorder
        dark:bg-surface dark:border-border
        rounded-xl p-4
        hover:border-primary transition
      "
    >
      <div>
        <p className="font-medium">{name}</p>
        <p className={`text-sm ${statusColor}`}>
          {status}
        </p>
      </div>
    </Link>
  );
}

function TaskRow({ title, assignedTo, status, priority }) {
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
    <div
      className="
        flex justify-between items-center
        bg-lightCard border border-lightBorder
        dark:bg-surface dark:border-border
        rounded-xl p-4
      "
    >
      <div>
        <p className="font-medium">
          {title}
        </p>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Assigned to {assignedTo || "—"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm ${statusColor}`}>
          {status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs ${priorityColor}`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
}
