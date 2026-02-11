import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const { projects } = useProjects();
  const { user } = useAuth();

  const role = user?.role || "employee";

  const [form, setForm] = useState({
    title: "",
    status: "Todo",          // ✅ FIXED (was Pending)
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
    project: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    if (loading) return; // ✅ Prevent double submit

    if (!form.title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!form.project) {
      setError("Please select a project");
      return;
    }

    try {
      setLoading(true);

      await addTask({
        title: form.title.trim(),
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate || null,
        assignedTo: form.assignedTo || null,
        project: form.project,
      });

      toast.success("Task created successfully 🚀");

      navigate("/tasks");

    } catch (err) {
      console.error("CREATE TASK ERROR:", err);

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create task ❌";

      setError(msg);
      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">
          Create Task
        </h1>

        <div className="space-y-4">
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* TITLE */}
          <div>
            <label className="text-sm mb-1 block">
              Title
            </label>
            <input
              name="title"
              placeholder="Task title"
              value={form.title}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

          {/* PROJECT */}
          <div>
            <label className="text-sm mb-1 block">
              Project
            </label>
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            >
              <option value="">
                Select project
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm mb-1 block">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="Blocked">
                Blocked
              </option>
            </select>
          </div>

          {/* PRIORITY */}
          <div>
            <label className="text-sm mb-1 block">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            >
              <option value="High">High</option>
              <option value="Medium">
                Medium
              </option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* ASSIGNED TO */}
          {role !== "employee" && (
            <div>
              <label className="text-sm mb-1 block">
                Assign To (User ID)
              </label>
              <input
                name="assignedTo"
                placeholder="Paste User ID"
                value={form.assignedTo}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>
          )}

          {/* DUE DATE */}
          <div>
            <label className="text-sm mb-1 block">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-xl disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Task"}
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
