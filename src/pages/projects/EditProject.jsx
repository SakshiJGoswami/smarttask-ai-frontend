import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { projects, updateProject, loading } = useProjects();

  /* ---------------- FIND PROJECT ---------------- */
  const existingProject = projects.find(
    (p) => String(p._id) === String(id)
  );

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    title: "",
    status: "Active",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOAD PROJECT INTO FORM ---------------- */
  useEffect(() => {
    if (!existingProject) return;

    setForm({
      title: existingProject.title || "",
      status: existingProject.status || "Active",
      description: existingProject.description || "",
    });
  }, [existingProject]);

  /* ---------------- LOADING / NOT FOUND ---------------- */

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-lightMuted">
          Loading project...
        </p>
      </DashboardLayout>
    );
  }

  if (!existingProject) {
    return (
      <DashboardLayout>
        <p className="text-red-500">
          Project not found ❌
        </p>
      </DashboardLayout>
    );
  }

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("Project title cannot be empty");
      return;
    }

    try {
      setSaving(true);

      await updateProject(existingProject._id, {
        title: form.title.trim(),
        status: form.status,
        description: form.description?.trim() || "",
      });

      toast.success("Project updated successfully ✅");

      navigate(`/projects/${existingProject._id}`);
    } catch (err) {
      console.error("UPDATE PROJECT ERROR:", err);
      toast.error("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-6">
          Edit Project
        </h1>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={saving}
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Project title"
          />

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={saving}
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={saving}
            className="w-full px-4 py-2 border rounded-xl"
            rows={4}
            placeholder="Project description"
          />

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-xl"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => navigate(-1)}
              disabled={saving}
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
