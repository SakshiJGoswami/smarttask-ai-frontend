import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateStatus, deleteTask } = useTasks();
  const { user } = useAuth();

  const role = user?.role || "employee";
  const canEdit = role !== "employee";

  // ✅ Match MongoDB _id safely
  const task = tasks.find(
    (t) => String(t._id) === String(id)
  );

  /* ---------------- TASK NOT FOUND ---------------- */

  if (!task) {
    return (
      <DashboardLayout>
        <p className="text-red-500">
          Task not found ❌
        </p>
      </DashboardLayout>
    );
  }

  /* ---------------- ACTIONS ---------------- */

  const handleMarkCompleted = async () => {
    if (task.status === "Completed") return;

    const confirmed = window.confirm(
      "Mark this task as completed?"
    );
    if (!confirmed) return;

    try {
      await updateStatus(task._id, "Completed");

      toast.success(
        "Task marked as completed ✅"
      );

    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);

      const msg =
        err.response?.data?.message ||
        "Failed to update status ❌";

      toast.error(msg);
    }
  };

  const handleDeleteTask = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      await deleteTask(task._id);

      toast.success(
        "Task deleted successfully 🗑️"
      );

      navigate("/tasks");

    } catch (err) {
      console.error("DELETE TASK ERROR:", err);

      const msg =
        err.response?.data?.message ||
        "Delete failed ❌";

      toast.error(msg);
    }
  };

  /* ---------------- AI HANDOFF ---------------- */

  const handleAskAI = () => {
    navigate("/ai", {
      state: {
        taskContext: {
          title: task.title,
          status: task.status,
          priority: task.priority,
          assignedTo: task.assignedTo?.name || null,
          dueDate: task.dueDate || null,
          description: task.description || "",
        },
      },
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">
          Task Details
        </h1>

        <DetailRow label="Title" value={task.title} />
        <DetailRow label="Status" value={task.status} />
        <DetailRow label="Priority" value={task.priority} />

        <DetailRow
          label="Assigned To"
          value={task.assignedTo?.name || "—"}
        />

        <DetailRow
          label="Due Date"
          value={
            task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "—"
          }
        />

        {/* 🤖 AI BUTTON */}
        <div className="pt-6">
          <button
            onClick={handleAskAI}
            className="
              px-4 py-2 rounded-lg
              bg-primary/10 text-primary
              hover:bg-primary/20
            "
          >
            🤖 Ask AI about this task
          </button>
        </div>

        {/* 🔐 ACTION BUTTONS */}
        {canEdit && (
          <div className="flex gap-4 pt-6">
            {task.status !== "Completed" && (
              <button
                onClick={handleMarkCompleted}
                className="
                  px-4 py-2
                  bg-primary text-white
                  rounded-lg
                "
              >
                Mark as Completed
              </button>
            )}

            <button
              onClick={() =>
                navigate(`/tasks/${task._id}/edit`)
              }
              className="
                px-4 py-2
                bg-lightCard
                rounded-lg
              "
            >
              Edit Task
            </button>

            <button
              onClick={handleDeleteTask}
              className="
                px-4 py-2
                bg-red-500 text-white
                rounded-lg
              "
            >
              Delete Task
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ---------------- DETAIL ROW ---------------- */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b py-3">
      <span className="text-lightMuted">
        {label}
      </span>
      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}
