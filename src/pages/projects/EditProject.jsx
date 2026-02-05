import DashboardLayout from "../../layouts/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "SmartTask AI",
    status: "Active",
    description: "AI powered task management system",
  });

  const handleChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const handleSave = () => {
    alert("Project updated (frontend demo)");
    navigate(`/projects/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold">Edit Project</h1>

        <div className="
          bg-lightSurface border border-lightBorder
          dark:bg-surface dark:border-border
          rounded-2xl p-6 space-y-4
        ">
          <input
            name="name"
            value={project.name}
            onChange={handleChange}
            className="
              w-full px-4 py-2 rounded-xl
              bg-lightBg text-lightText border border-lightBorder
              dark:bg-card dark:text-white dark:border-border
            "
          />

          <select
            name="status"
            value={project.status}
            onChange={handleChange}
            className="
              w-full px-4 py-2 rounded-xl
              bg-lightBg text-lightText border border-lightBorder
              dark:bg-card dark:text-white dark:border-border
            "
          >
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <textarea
            name="description"
            value={project.description}
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
