import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

/* -------------------- PROVIDER -------------------- */

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design Dashboard UI",
      status: "In Progress",
      priority: "High",
      assignedTo: "employee",
      due: "",
      estimateHours: 4,
    },
    {
      id: "2",
      title: "Fix Login Page",
      status: "Completed",
      priority: "Medium",
      assignedTo: "employee",
      due: "",
      estimateHours: 2,
    },
  ]);

  /* -------- UI FEEDBACK STATE (FRONTEND ONLY) -------- */
  const [lastAction, setLastAction] = useState(null);
  const [lastUpdatedTaskId, setLastUpdatedTaskId] = useState(null);

  /* -------------------- ADD -------------------- */
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now().toString(),
        assignedTo: task.assignedTo || "unassigned",
        status: normalizeStatus(task.status),
      },
    ]);
    setLastAction("TASK_CREATED");
  };

  /* -------------------- UPDATE -------------------- */
  const updateTask = (taskId, patch) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              ...patch,
              status: patch.status
                ? normalizeStatus(patch.status)
                : t.status,
              assignedTo:
                patch.assignedTo || t.assignedTo || "unassigned",
            }
          : t
      )
    );

    setLastAction("TASK_UPDATED");
    setLastUpdatedTaskId(taskId);
  };

  /* -------------------- DELETE -------------------- */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setLastAction("TASK_DELETED");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        lastAction,
        lastUpdatedTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

/* -------------------- HELPERS -------------------- */

const normalizeStatus = (status) => {
  if (!status) return "Pending";
  const s = status.toLowerCase();
  if (s.includes("progress")) return "In Progress";
  if (s.includes("done") || s.includes("complete"))
    return "Completed";
  if (s.includes("block")) return "Blocked";
  return "Pending";
};

export const useTasks = () => useContext(TaskContext);
