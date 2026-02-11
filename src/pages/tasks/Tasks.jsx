import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";

export default function Tasks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, deleteTask, loading } = useTasks();

  const role = user?.role || "employee";

  /* 🔐 ROLE-BASED VISIBILITY */
  const visibleTasks =
    role === "employee"
      ? tasks.filter(
          (t) => t.assignedTo?.role === "employee"
        )
      : tasks;

  const canCreateTask = role !== "employee";
  const canEditDelete = role !== "employee";

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold mb-1">
            Tasks
          </h1>
          <p className="text-sm text-lightMuted dark:text-gray-400">
            View and manage tasks
          </p>
        </div>

        {canCreateTask && (
          <Link
            to="/tasks/create"
            className="px-4 py-2 rounded-xl bg-primary text-white"
          >
            + Create Task
          </Link>
        )}
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-lightMuted">
          Loading tasks...
        </p>
      ) : (
        <div className="bg-lightSurface border border-lightBorder dark:border-border rounded-2xl p-6">
          {visibleTasks.length === 0 ? (
            <p className="text-lightMuted">
              No tasks available
            </p>
          ) : (
            <div className="space-y-4">
              {visibleTasks.map((task) => (
                <TaskRow
                  key={task._id}
                  task={task}
                  canEditDelete={canEditDelete}
                  onDelete={async () => {
                    const confirmed = window.confirm(
                      "Delete this task?"
                    );
                    if (!confirmed) return;

                    await deleteTask(task._id);
                  }}
                  onEdit={() =>
                    navigate(`/tasks/${task._id}/edit`)
                  }
                  onOpen={() =>
                    navigate(`/tasks/${task._id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

/* -------------------- TASK ROW -------------------- */

function TaskRow({ task, canEditDelete, onDelete, onEdit, onOpen }) {
  const { title, status, priority, dueDate, assignedTo } = task;

  const statusColor =
    status === "Completed"
      ? "text-green-600 dark:text-green-400"
      : status === "In Progress"
      ? "text-yellow-600 dark:text-yellow-400"
      : status === "Blocked"
      ? "text-red-500"
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
        onClick={onOpen}
      >
        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-lightMuted">
          Due:{" "}
          {dueDate
            ? new Date(dueDate).toLocaleDateString()
            : "—"}{" "}
          • Assigned to {assignedTo?.name || "—"}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className={`text-sm ${statusColor}`}>
          {status}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs ${priorityColor}`}
        >
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
