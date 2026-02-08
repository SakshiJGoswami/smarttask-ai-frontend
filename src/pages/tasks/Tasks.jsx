import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";

export default function Tasks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, deleteTask } = useTasks();

  const role = user?.role || "employee";

  /* 🔐 ROLE-BASED VISIBILITY */
  const visibleTasks =
    role === "employee"
      ? tasks.filter((t) => t.assignedTo === "employee")
      : tasks;

  const canCreateTask = role !== "employee";
  const canEditDelete = role !== "employee";

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Tasks</h1>
          <p className="text-sm text-lightMuted dark:text-gray-400">
            View and manage tasks
          </p>
        </div>

        {/* CREATE TASK */}
        {canCreateTask && (
          <Link
            to="/tasks/create"
            className="px-4 py-2 rounded-xl bg-primary text-white"
          >
            + Create Task
          </Link>
        )}
      </div>

      {/* TASK LIST */}
      <div className="bg-lightSurface border border-lightBorder dark:border-border rounded-2xl p-6">
        {visibleTasks.length === 0 ? (
          <p className="text-lightMuted">No tasks available</p>
        ) : (
          <div className="space-y-4">
            {visibleTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                canEditDelete={canEditDelete}
                onDelete={() => {
                  if (window.confirm("Delete this task?")) {
                    deleteTask(task.id);
                  }
                }}
                onEdit={() => navigate(`/tasks/${task.id}/edit`)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* -------------------- TASK ROW -------------------- */

function TaskRow({ task, canEditDelete, onDelete, onEdit }) {
  const { id, title, status, priority, due, assignedTo } = task;

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
      {/* LEFT */}
      <div
        className="cursor-pointer"
        onClick={() => window.location.assign(`/tasks/${id}`)}
      >
        <p className="font-medium">{title}</p>
        <p className="text-sm text-lightMuted">
          Due: {due || "—"} • Assigned to {assignedTo || "—"}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className={`text-sm ${statusColor}`}>{status}</span>
        <span className={`px-3 py-1 rounded-full text-xs ${priorityColor}`}>
          {priority}
        </span>

        {canEditDelete && (
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1 text-xs rounded-lg border hover:border-primary"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
