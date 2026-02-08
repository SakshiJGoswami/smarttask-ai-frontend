import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

export default function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const { projects } = useProjects();
  const { user } = useAuth();

  const role = user?.role || "employee";

  /* -------- FORM STATE -------- */
  const [form, setForm] = useState({
    title: "",
    status: "Pending",
    priority: "Medium",
    due: "",
    assignedTo: "employee",
    projectId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* -------- HANDLERS -------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!form.projectId) {
      setError("Please select a project");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addTask({
        ...form,
        createdBy: role,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      navigate("/tasks");
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">Create Task</h1>

        <div className="space-y-4">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* TITLE */}
          <div>
            <label className="text-sm mb-1 block">Title</label>
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
            <label className="text-sm mb-1 block">Project</label>
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm mb-1 block">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Blocked</option>
            </select>
          </div>

          {/* PRIORITY */}
          <div>
            <label className="text-sm mb-1 block">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* ASSIGNED TO (manager/admin only) */}
          {role !== "employee" && (
            <div>
              <label className="text-sm mb-1 block">Assigned To</label>
              <select
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 rounded-xl border"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          )}

          {/* DUE DATE */}
          <div>
            <label className="text-sm mb-1 block">Due Date</label>
            <input
              type="date"
              name="due"
              value={form.due}
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
              className="px-6 py-2 bg-primary text-white rounded-xl"
            >
              {loading ? "Creating..." : "Create Task"}
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
