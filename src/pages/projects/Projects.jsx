import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const projects = [
  { id: 1, name: "SmartTask AI", manager: "John Doe", progress: 72, status: "On Track" },
  { id: 2, name: "Client CRM System", manager: "Sarah Chen", progress: 45, status: "At Risk" },
  { id: 3, name: "Marketing Website", manager: "Mike Ross", progress: 90, status: "Almost Done" },
];

export default function Projects() {
  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Projects</h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Overview of ongoing and completed projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </DashboardLayout>
  );
}

function ProjectCard({ id, name, manager, progress, status }) {
  const statusColor =
    status === "On Track"
      ? "text-green-600 dark:text-green-400"
      : status === "Almost Done"
      ? "text-cyan-600 dark:text-cyan-400"
      : "text-red-600 dark:text-red-400";

  return (
    <Link
      to={`/projects/${id}`}
      className="
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-6 hover:border-primary transition
      "
    >
      <h2 className="text-lg font-semibold mb-1">{name}</h2>

      <p className="text-sm text-lightMuted dark:text-gray-400 mb-4">
        Manager: {manager}
      </p>

      <div className="mb-3">
        <div className="h-2 bg-lightBorder dark:bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-lightMuted dark:text-gray-400 mt-1">
          {progress}% completed
        </p>
      </div>

      <p className={`text-sm font-medium ${statusColor}`}>
        {status}
      </p>
    </Link>
  );
}
