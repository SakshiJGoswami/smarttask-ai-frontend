import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Project Details</h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          Project ID: {id}
        </p>
      </div>

      <div className="
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-6 space-y-6
      ">
        <DetailRow label="Project Name" value="SmartTask AI" />
        <DetailRow label="Manager" value="John Doe" />
        <DetailRow label="Status" value="On Track" />
        <DetailRow label="Progress" value="72%" />
        <DetailRow
          label="Description"
          value="An intelligent task and project management system with AI-powered insights."
        />

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => navigate("/tasks")}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            View Tasks
          </button>

          <button
            onClick={() => navigate(`/projects/${id}/edit`)}
            className="
              px-4 py-2 rounded-lg
              bg-lightCard text-lightText
              dark:bg-card dark:text-gray-300
            "
          >
            Edit Project
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-lightBorder dark:border-border pb-3">
      <span className="text-lightMuted dark:text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
