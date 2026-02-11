import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();

  // ✅ Find task using Mongo _id
  const existingTask = tasks.find(
    (t) => String(t._id) === String(id)
  );

  const [form, setForm] = useState({
    title: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOAD TASK ---------------- */

  useEffect(() => {
    if (!existingTask) return;

    setForm({
      title: existingTask.title || "",
      status: existingTask.status || "Todo",
      priority: existingTask.priority || "Medium",

      // ✅ Format date for input[type=date]
      dueDate: existingTask.dueDate
        ? new Date(existingTask.dueDate)
            .toISOString()
            .substring(0, 10)
        : "",

      assignedTo: existingTask.assignedTo?._id || "",
    });
  }, [existingTask]);

  /* ---------------- TASK NOT FOUND ---------------- */

  if (!existingTask) {
    return (
      <DashboardLayout>
        <p className="text-red-500">
          Task not found ❌
        </p>
      </DashboardLayout>
    );
  }

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSave = async () => {
    if (loading) return; // ✅ Prevent spam click

    if (!form.title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await updateTask(existingTask._id, {
        title: form.title.trim(),
        status: form.status,
        priority: form.priority,

        // ✅ Null-safe values
        dueDate: form.dueDate || null,
        assignedTo: form.assignedTo || null,
      });

      toast.success("Task updated successfully ✅");

      navigate(`/tasks/${existingTask._id}`);

    } catch (err) {
      console.error("UPDATE TASK ERROR:", err);

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Update failed ❌";

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
          Edit Task
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
              value={form.title}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl border"
            />
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
          <div>
            <label className="text-sm mb-1 block">
              Assigned To (User ID)
            </label>
            <input
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              disabled={loading}
              placeholder="Paste User ID"
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

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
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-xl disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
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
