import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ProjectProvider } from "./context/ProjectContext";

// 🔥 APPLY SAVED THEME ON LOAD
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
