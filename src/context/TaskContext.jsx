import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/apiClient";

const TaskContext = createContext();

/* ================= PROVIDER ================= */

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------- UI FEEDBACK STATE -------- */
  const [lastAction, setLastAction] = useState(null);
  const [lastUpdatedTaskId, setLastUpdatedTaskId] = useState(null);

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks");

      const fetchedTasks = res.data.tasks;

      if (!Array.isArray(fetchedTasks)) {
        throw new Error("Invalid tasks response ❌");
      }

      setTasks(fetchedTasks);

      return fetchedTasks;
    } catch (error) {
      console.error("FETCH TASKS ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch tasks ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks().catch(() => {});
  }, []);

  /* ---------------- ADD TASK ---------------- */
  const addTask = async (taskData) => {
    try {
      const res = await api.post("/tasks", taskData);

      const newTask = res.data.task;

      if (!newTask) {
        throw new Error("Invalid task response ❌");
      }

      setTasks((prev) => [...prev, newTask]);

      setLastAction("TASK_CREATED");

      return newTask;
    } catch (error) {
      console.error("ADD TASK ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to create task ❌"
      );
    }
  };

  /* ---------------- UPDATE TASK ---------------- */
  const updateTask = async (taskId, patch) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, patch);

      const updatedTask = res.data.task;

      if (!updatedTask) {
        throw new Error("Invalid update response ❌");
      }

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? updatedTask : t
        )
      );

      setLastAction("TASK_UPDATED");
      setLastUpdatedTaskId(taskId);

      return updatedTask;
    } catch (error) {
      console.error("UPDATE TASK ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to update task ❌"
      );
    }
  };

  /* ---------------- STATUS UPDATE ---------------- */
  const updateStatus = async (taskId, status) => {
    try {
      const res = await api.patch(
        `/tasks/${taskId}/status`,
        { status }
      );

      const updatedTask = res.data.task;

      if (!updatedTask) {
        throw new Error("Invalid status response ❌");
      }

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? updatedTask : t
        )
      );

      setLastAction("TASK_STATUS_UPDATED");
      setLastUpdatedTaskId(taskId);

      return updatedTask;
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to update status ❌"
      );
    }
  };

  /* ---------------- DELETE TASK ---------------- */
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      setTasks((prev) =>
        prev.filter((t) => t._id !== taskId)
      );

      setLastAction("TASK_DELETED");

      return true;
    } catch (error) {
      console.error("DELETE TASK ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to delete task ❌"
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        addTask,
        updateTask,
        updateStatus,
        deleteTask,
        lastAction,
        lastUpdatedTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useTasks = () => useContext(TaskContext);
