import DashboardLayout from "../../layouts/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "Design Dashboard UI",
    priority: "High",
    status: "In Progress",
    description: "Create responsive dashboard UI",
  });

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSave = () => {
    alert("Task updated (frontend demo)");
    navigate(`/tasks/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold">Edit Task</h1>

        <div className="
          bg-lightSurface border border-lightBorder
          dark:bg-surface dark:border-border
          rounded-2xl p-6 space-y-4
        ">
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            className="
              w-full px-4 py-2 rounded-xl
              bg-lightBg text-lightText border border-lightBorder
              dark:bg-card dark:text-white dark:border-border
            "
          />

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="
              w-full px-4 py-2 rounded-xl
              bg-lightBg text-lightText border border-lightBorder
              dark:bg-card dark:text-white dark:border-border
            "
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            className="
              w-full px-4 py-2 rounded-xl
              bg-lightBg text-lightText border border-lightBorder
              dark:bg-card dark:text-white dark:border-border
            "
          />

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-xl"
            >
              Save
            </button>

            <button
              onClick={() => navigate(-1)}
              className="
                px-4 py-2 rounded-xl
                bg-lightCard text-lightText
                dark:bg-card dark:text-gray-300
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
