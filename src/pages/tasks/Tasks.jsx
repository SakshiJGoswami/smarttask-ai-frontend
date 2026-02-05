import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

/* ---------------- MOCK TASKS ---------------- */

const tasks = [
  {
    id: 1,
    title: "Design Dashboard UI",
    status: "In Progress",
    priority: "High",
    due: "Today",
    assignedTo: "employee", // employee role
  },
  {
    id: 2,
    title: "Fix Auth Bugs",
    status: "Pending",
    priority: "Medium",
    due: "Tomorrow",
    assignedTo: "manager",
  },
  {
    id: 3,
    title: "Write API Documentation",
    status: "Completed",
    priority: "Low",
    due: "Yesterday",
    assignedTo: "employee",
  },
];

export default function Tasks() {
  const { user } = useAuth();

  // 🔐 ROLE-BASED VISIBILITY
  const visibleTasks =
    user.role === "employee"
      ? tasks.filter((t) => t.assignedTo === "employee")
      : tasks;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Tasks</h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          View and manage assigned tasks
        </p>
      </div>

      <div className="bg-lightSurface border border-lightBorder dark:bg-card dark:border-border rounded-2xl p-6">
        <div className="space-y-4">
          {visibleTasks.map((task) => (
            <TaskRow key={task.id} {...task} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function TaskRow({ id, title, status, priority, due }) {
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
    <Link
      to={`/tasks/${id}`}
      className="flex justify-between items-center bg-lightCard border border-lightBorder dark:bg-surface dark:border-border rounded-xl p-4 hover:border-primary transition"
    >
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Due: {due}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm ${statusColor}`}>{status}</span>
        <span className={`px-3 py-1 rounded-full text-xs ${priorityColor}`}>
          {priority}
        </span>
      </div>
    </Link>
  );
}
