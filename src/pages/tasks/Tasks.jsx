import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

/* ---------------- MOCK DATA ---------------- */

const tasks = [
  {
    id: 1,
    title: "Design Dashboard UI",
    status: "In Progress",
    priority: "High",
    due: "Today",
  },
  {
    id: 2,
    title: "Fix Auth Bugs",
    status: "Pending",
    priority: "Medium",
    due: "Tomorrow",
  },
  {
    id: 3,
    title: "Write API Documentation",
    status: "Completed",
    priority: "Low",
    due: "Yesterday",
  },
];

/* ---------------- PAGE ---------------- */

export default function Tasks() {
  return (
  <DashboardLayout role="employee">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Tasks</h1>
        <p className="text-sm text-gray-400">
          View and manage assigned tasks
        </p>
      </div>

      {/* TASK LIST */}
      <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass">
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskRow key={task.id} {...task} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- COMPONENT ---------------- */

function TaskRow({ id, title, status, priority, due }) {
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
    <Link
      to={`/tasks/${id}`}
      className="flex justify-between items-center bg-surface border border-border rounded-xl p-4 hover:border-primary transition"
    >
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
    </Link>
  );
}
