import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    id,
    title: "Design Dashboard UI",
    status: "In Progress",
    priority: "High",
    due: "Today",
    description: "Create responsive dashboard UI using Tailwind CSS.",
  });

  useEffect(() => {}, [id]);

  const handleMarkCompleted = () => {
    setTask((prev) => ({ ...prev, status: "Completed" }));
    alert("Task marked as completed (frontend-only)");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Task Details</h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Task ID: {id}
        </p>
      </div>

      <div className="
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-6 space-y-6
      ">
        <DetailRow label="Title" value={task.title} />
        <DetailRow label="Status" value={task.status} />
        <DetailRow label="Priority" value={task.priority} />
        <DetailRow label="Due Date" value={task.due} />
        <DetailRow label="Description" value={task.description} />

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleMarkCompleted}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            Mark as Completed
          </button>

          <button
            onClick={() => navigate(`/tasks/${id}/edit`)}
            className="
              px-4 py-2 rounded-lg
              bg-lightCard text-lightText
              dark:bg-card dark:text-gray-300
            "
          >
            Edit Task
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-lightBorder dark:border-border pb-3">
      <span className="text-lightMuted dark:text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
