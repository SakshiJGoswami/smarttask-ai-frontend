import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "SmartTask AI",
      status: "Active",
      description: "AI powered task management system",
    },
    {
      id: "2",
      name: "Client CRM",
      status: "Completed",
      description: "CRM system for client handling",
    },
  ]);

  const addProject = (project) => {
    setProjects((prev) => [
      ...prev,
      { ...project, id: Date.now().toString() },
    ]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updatedProject } : p
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
