import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/apiClient";

const ProjectContext = createContext();

/* ================= PROVIDER ================= */

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await api.get("/projects");

      setProjects(res.data.projects || []);
    } catch (error) {
      console.error("FETCH PROJECTS ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch projects ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects().catch(() => {});
  }, []);

  /* ---------------- ADD PROJECT ---------------- */
  const addProject = async (projectData) => {
    try {
      const res = await api.post("/projects", projectData);

      const newProject = res.data.project;

      if (!newProject) {
        throw new Error("Invalid project response ❌");
      }

      setProjects((prev) => [...prev, newProject]);

      return newProject; // ✅ allows UI chaining
    } catch (error) {
      console.error("ADD PROJECT ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to add project ❌"
      );
    }
  };

  /* ---------------- UPDATE PROJECT ---------------- */
  const updateProject = async (projectId, updates) => {
    try {
      const res = await api.put(
        `/projects/${projectId}`,
        updates
      );

      const updatedProject = res.data.project;

      if (!updatedProject) {
        throw new Error("Invalid update response ❌");
      }

      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? updatedProject : p
        )
      );

      return updatedProject;
    } catch (error) {
      console.error("UPDATE PROJECT ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to update project ❌"
      );
    }
  };

  /* ---------------- DELETE PROJECT ---------------- */
  const deleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);

      setProjects((prev) =>
        prev.filter((p) => p._id !== projectId)
      );

      return true;
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);

      throw new Error(
        error.response?.data?.message ||
          "Failed to delete project ❌"
      );
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useProjects = () => useContext(ProjectContext);
