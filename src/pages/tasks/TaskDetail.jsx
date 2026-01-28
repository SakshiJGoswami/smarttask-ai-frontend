import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

/* ---------------- PAGE ---------------- */

export default function TaskDetail() {
  const { id } = useParams();

  return (
    <DashboardLayout role="employee">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">
          Task Details
        </h1>
        <p className="text-sm text-gray-400">
          Task ID: {id}
        </p>
      </div>

      {/* DETAILS */}
      <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass space-y-6">
        <DetailRow label="Title" value="Design Dashboard UI" />
        <DetailRow label="Status" value="In Progress" />
        <DetailRow label="Priority" value="High" />
        <DetailRow label="Due Date" value="Today" />
        <DetailRow label="Description" value="Create responsive dashboard UI using Tailwind CSS." />

        {/* ACTIONS (UI ONLY) */}
        <div className="flex gap-4 pt-4">
          <button className="px-4 py-2 rounded-lg bg-primary text-white">
            Mark as Completed
          </button>
          <button className="px-4 py-2 rounded-lg bg-card border border-border">
            Edit Task
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
