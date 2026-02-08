import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";

/* -------------------- PAGE -------------------- */

export default function CreateProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const [form, setForm] = useState({
    name: "",
    status: "Active",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* -------------------- HANDLERS -------------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("Project name is required");
      return;
    }

    if (form.name.trim().length < 3) {
      setError("Project name must be at least 3 characters");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addProject({
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
        status: form.status || "Active",
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      navigate("/projects");
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-6">
          Create Project
        </h1>

        {error && (
          <p className="text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* NAME */}
          <input
            name="name"
            placeholder="Project name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-xl"
          />

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Project description (optional)"
            value={form.description}
            onChange={handleChange}
            disabled={loading}
            rows={4}
            className="w-full px-4 py-2 border rounded-xl"
          />

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-xl"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>

            <button
              onClick={() => navigate(-1)}
              disabled={loading}
              className="px-6 py-2 bg-lightCard rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
