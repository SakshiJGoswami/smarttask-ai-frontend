import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

/* ---------------- PAGE ---------------- */

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <DashboardLayout role="manager">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">
          Project Details
        </h1>
        <p className="text-sm text-gray-400">
          Project ID: {id}
        </p>
      </div>

      {/* DETAILS */}
      <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass space-y-6">
        <DetailRow label="Project Name" value="SmartTask AI" />
        <DetailRow label="Manager" value="John Doe" />
        <DetailRow label="Status" value="On Track" />
        <DetailRow label="Progress" value="72%" />
        <DetailRow
          label="Description"
          value="An intelligent task and project management system with AI-powered insights."
        />

        {/* ACTIONS (UI ONLY) */}
        <div className="flex gap-4 pt-4">
          <button className="px-4 py-2 rounded-lg bg-primary text-white">
            View Tasks
          </button>
          <button className="px-4 py-2 rounded-lg bg-card border border-border">
            Edit Project
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- COMPONENT ---------------- */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-border pb-3">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
