import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { projects, deleteProject } = useProjects();
  const { tasks, loading } = useTasks();
  const { user } = useAuth();

  const role = user?.role || "employee";
  const canEdit = role !== "employee";

  /* ---------------- FIND PROJECT ---------------- */
  const project = projects.find(
    (p) => String(p._id) === String(id)
  );

  if (!project) {
    return (
      <DashboardLayout>
        <p className="text-red-500">
          Project not found ❌
        </p>
      </DashboardLayout>
    );
  }

  /* ---------------- FILTER TASKS ---------------- */
  const projectTasks = tasks.filter(
    (t) =>
      String(t.project?._id || t.project) ===
      String(project._id)
  );

  const totalTasks = projectTasks.length;

  const completedTasks = projectTasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  /* ---------------- DELETE PROJECT ---------------- */
  const handleDeleteProject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await deleteProject(project._id);

      toast.success(
        "Project deleted successfully 🗑️"
      );

      navigate("/projects");
    } catch (err) {
      console.error(
        "DELETE PROJECT ERROR:",
        err
      );
      toast.error("Delete failed ❌");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Project Details
          </h1>
          <p className="text-sm text-lightMuted">
            Overview and progress of the project
          </p>
        </div>

        {/* BASIC INFO */}
        <DetailRow
          label="Title"
          value={project.title || "—"}
        />
        <DetailRow
          label="Status"
          value={project.status || "—"}
        />
        <DetailRow
          label="Description"
          value={project.description || "—"}
        />

        {/* PROGRESS */}
        <div className="mt-6">
          <p className="text-sm mb-2">
            Progress: {progress}%
          </p>

          <div className="w-full h-3 bg-lightCard rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-xs text-lightMuted mt-1">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>

        {/* TASKS */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Project Tasks
          </h2>

          {loading ? (
            <p className="text-lightMuted">
              Loading tasks...
            </p>
          ) : projectTasks.length === 0 ? (
            <p className="text-lightMuted">
              No tasks assigned to this project
            </p>
          ) : (
            <div className="space-y-3">
              {projectTasks.map((task) => (
                <div
                  key={task._id}
                  className="
                    p-4 border border-lightBorder
                    rounded-xl flex justify-between items-center
                  "
                >
                  <div>
                    <p className="font-medium">
                      {task.title}
                    </p>
                    <p className="text-sm text-lightMuted">
                      Status: {task.status}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/tasks/${task._id}`)
                    }
                    className="text-sm text-primary"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        {canEdit && (
          <div className="flex gap-4 pt-8">
            <button
              onClick={() =>
                navigate(
                  `/projects/${project._id}/edit`
                )
              }
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Edit Project
            </button>

            <button
              onClick={handleDeleteProject}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete Project
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ---------------- DETAIL ROW ---------------- */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b py-3">
      <span className="text-lightMuted">
        {label}
      </span>
      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}
