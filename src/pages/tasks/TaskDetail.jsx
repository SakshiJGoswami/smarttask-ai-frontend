import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();
  const { user } = useAuth();

  const role = user?.role || "employee";
  const canEdit = role !== "employee";

  const [toast, setToast] = useState("");

  const task = tasks.find((t) => String(t.id) === String(id));

  if (!task) {
    return (
      <DashboardLayout>
        <p className="text-red-500">Task not found</p>
      </DashboardLayout>
    );
  }

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleMarkCompleted = () => {
    const confirmed = window.confirm(
      "Mark this task as completed?"
    );
    if (!confirmed) return;

    updateTask(id, { status: "Completed" });
    showToast("Task marked as completed");

    setTimeout(() => {
      navigate("/tasks");
    }, 800);
  };

  const handleDeleteTask = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    deleteTask(id);
    showToast("Task deleted successfully");

    setTimeout(() => {
      navigate("/tasks");
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">
          Task Details
        </h1>

        {/* TOAST */}
        {toast && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 text-sm">
            {toast}
          </div>
        )}

        <DetailRow label="Title" value={task.title} />
        <DetailRow label="Status" value={task.status} />
        <DetailRow label="Priority" value={task.priority} />
        <DetailRow label="Assigned To" value={task.assignedTo || "—"} />
        <DetailRow label="Due Date" value={task.due || "—"} />

        {canEdit && (
          <div className="flex gap-4 pt-6">
            {task.status !== "Completed" && (
              <button
                onClick={handleMarkCompleted}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Mark as Completed
              </button>
            )}

            <button
              onClick={() => navigate(`/tasks/${id}/edit`)}
              className="px-4 py-2 bg-lightCard rounded-lg"
            >
              Edit Task
            </button>

            <button
              onClick={handleDeleteTask}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete Task
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b py-3">
      <span className="text-lightMuted">{label}</span>
      <span className="font-medium">{value}</span>
      
    </div>
  );
}
