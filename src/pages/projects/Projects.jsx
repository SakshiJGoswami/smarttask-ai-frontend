import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

/* ---------------- MOCK DATA ---------------- */

const projects = [
  {
    id: 1,
    name: "SmartTask AI",
    manager: "John Doe",
    progress: 72,
    status: "On Track",
  },
  {
    id: 2,
    name: "Client CRM System",
    manager: "Sarah Chen",
    progress: 45,
    status: "At Risk",
  },
  {
    id: 3,
    name: "Marketing Website",
    manager: "Mike Ross",
    progress: 90,
    status: "Almost Done",
  },
];

/* ---------------- PAGE ---------------- */

export default function Projects() {
  return (
 <DashboardLayout role="manager">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Projects</h1>
        <p className="text-sm text-gray-400">
          Overview of ongoing and completed projects
        </p>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </DashboardLayout>
  );
}

/* ---------------- COMPONENT ---------------- */

function ProjectCard({ id, name, manager, progress, status }) {
  const statusColor =
    status === "On Track"
      ? "text-green-400"
      : status === "Almost Done"
      ? "text-cyan-400"
      : "text-red-400";

  return (
    <Link
      to={`/projects/${id}`}
      className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass hover:border-primary transition"
    >
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-400 mb-4">
        Manager: {manager}
      </p>

      <div className="mb-3">
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {progress}% completed
        </p>
      </div>

      <p className={`text-sm font-medium ${statusColor}`}>
        {status}
      </p>
    </Link>
  );
}
