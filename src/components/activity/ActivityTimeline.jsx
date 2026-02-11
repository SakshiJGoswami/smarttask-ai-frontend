import DashboardLayout from "../../layouts/DashboardLayout";
import { activityMock } from "../../data/activityMock";
import {
  Clock,
  CheckCircle,
  Brain,
  Folder,
  LogIn,
  ListChecks,
} from "lucide-react";

/* -------- ICON MAP -------- */
const iconMap = {
  login: <LogIn size={16} />,
  task: <CheckCircle size={16} />,
  ai: <Brain size={16} />,
  project: <Folder size={16} />,
  update: <ListChecks size={16} />,
};

export default function ActivityTimeline() {
  const activities = Array.isArray(activityMock)
    ? activityMock
    : [];

  return (
    <DashboardLayout>
      <div
        className="
          bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl p-6
        "
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">
            Activity Timeline
          </h1>
          <p className="text-sm text-lightMuted dark:text-gray-400">
            Track recent actions across tasks, projects, and AI insights
          </p>
        </div>

        {/* TIMELINE */}
        <div className="space-y-6">
          {activities.length === 0 ? (
            <p className="text-lightMuted">
              No recent activity
            </p>
          ) : (
            activities.map((item, index) => (
              <div
                key={item.id || index} 
                className="flex gap-4 items-start"
              >
                {/* ICON */}
                <div
                  className="
                    w-9 h-9 rounded-full
                    bg-primary/15 text-primary
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  {iconMap[item.type] || (
                    <Clock size={16} />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">
                    {item.message || "Activity update"}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-lightMuted mt-1">
                    <Clock size={12} />
                    {item.time || "Just now"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
