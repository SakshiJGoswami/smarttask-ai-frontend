import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

export default function Projects() {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();
  const { user } = useAuth();

  const role = user?.role || "employee";
  const canManage = role !== "employee";

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Projects</h1>
          <p className="text-sm text-lightMuted">
            Track and manage ongoing projects
          </p>
        </div>

        {canManage && (
          <Link
            to="/projects/create"
            className="px-4 py-2 bg-primary text-white rounded-xl"
          >
            + Create Project
          </Link>
        )}
      </div>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-lightMuted">No projects available</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              canManage={canManage}
              onOpen={() => navigate(`/projects/${project.id}`)}
              onDelete={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this project?"
                  )
                ) {
                  deleteProject(project.id);
                }
              }}
            />
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

/* -------------------- PROJECT CARD -------------------- */

function ProjectCard({ project, canManage, onOpen, onDelete }) {
  const { name, status, description } = project;

  const statusColor =
    status === "Active"
      ? "text-green-600 dark:text-green-400"
      : status === "Completed"
      ? "text-cyan-600 dark:text-cyan-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div
      className="
        p-6 border border-lightBorder dark:border-border
        rounded-2xl bg-lightSurface dark:bg-card
        hover:border-primary transition
        flex flex-col justify-between
      "
    >
      <div
        className="cursor-pointer"
        onClick={onOpen}
      >
        <h2 className="font-semibold mb-1">{name}</h2>
        <p className={`text-sm mb-2 ${statusColor}`}>
          {status}
        </p>
        {description && (
          <p className="text-sm text-lightMuted line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {canManage && (
        <div className="flex gap-2 pt-4">
          <button
            onClick={onOpen}
            className="flex-1 px-3 py-2 text-sm border rounded-lg hover:border-primary"
          >
            View
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
