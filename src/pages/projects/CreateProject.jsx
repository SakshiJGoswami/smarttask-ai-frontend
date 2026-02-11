import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";
import toast from "react-hot-toast";

export default function CreateProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  /* ---------------- STATE ---------------- */

  const [form, setForm] = useState({
    title: "",
    status: "Active",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async () => {
    if (loading) return; // ✅ block spam click

    const cleanTitle = form.title.trim();
    const cleanDescription = form.description.trim();

    if (!cleanTitle) {
      setError("Project title is required");
      return;
    }

    if (cleanTitle.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    try {
      setLoading(true);

      await addProject({
        title: cleanTitle,
        description: cleanDescription || "", // ✅ never undefined
        status: form.status || "Active",
      });

      toast.success("Project created successfully 🚀");

      navigate("/projects");
    } catch (err) {
      console.error("CREATE PROJECT ERROR:", err);

      const message =
        err?.message || "Failed to create project ❌";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

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
          {/* TITLE */}
          <input
            name="title"
            placeholder="Project title"
            value={form.title}
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
              className="px-6 py-2 bg-primary text-white rounded-xl disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>

            <button
              onClick={() => navigate(-1)}
              disabled={loading}
              className="px-6 py-2 bg-lightCard rounded-xl disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
