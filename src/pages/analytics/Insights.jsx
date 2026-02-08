import DashboardLayout from "../../layouts/DashboardLayout";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

/* ---------------- PAGE ---------------- */

export default function Insights() {
  const { tasks } = useTasks();
  const { projects } = useProjects();

  /* -------- BASIC METRICS -------- */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const blockedTasks = tasks.filter(
    (t) => t.status === "Blocked"
  );

  const dueSoonTasks = tasks.filter((t) => {
    if (!t.due) return false;
    const dueDate = new Date(t.due);
    const now = new Date();
    const diff =
      (dueDate - now) / (1000 * 60 * 60 * 24);
    return diff <= 2 && diff >= 0 && t.status !== "Completed";
  });

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const activeProjects = projects.filter(
    (p) => p.status !== "Completed"
  ).length;

  /* -------- AI-LIKE INSIGHTS -------- */
  const productivityTrend =
    completionRate > 70
      ? "+ Good Progress"
      : completionRate > 40
      ? "Stable"
      : "Needs Attention";

  const riskLevel =
    blockedTasks.length > 2 || dueSoonTasks.length > 3
      ? "High"
      : blockedTasks.length > 0
      ? "Medium"
      : "Low";

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">
            AI Insights
          </h1>
          <p className="text-gray-400 text-sm">
            SmartTask AI analyzes live task and project data to
            assist decision-making.
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard
            title="Task Completion"
            value={`${completionRate}%`}
            description="Overall task completion rate"
            color="text-green-400"
          />

          <InsightCard
            title="Active Projects"
            value={activeProjects}
            description="Projects currently in progress"
            color="text-primary"
          />

          <InsightCard
            title="Risk Level"
            value={riskLevel}
            description={`${blockedTasks.length} blocked • ${dueSoonTasks.length} due soon`}
            color={
              riskLevel === "High"
                ? "text-red-400"
                : riskLevel === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }
          />
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* AI SUMMARY */}
          <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
            <h2 className="font-semibold mb-3">
              📊 AI Summary
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Task completion rate is currently{" "}
              <strong>{completionRate}%</strong>.
              Productivity trend is{" "}
              <strong>{productivityTrend}</strong>.
              {blockedTasks.length > 0 && (
                <> {blockedTasks.length} task(s) are blocked and may impact delivery.</>
              )}
            </p>
          </div>

          {/* AI SUGGESTIONS */}
          <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
            <h2 className="font-semibold mb-3">
              💡 AI Suggestions
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {blockedTasks.length > 0 && (
                <li>• Resolve blocked tasks as priority</li>
              )}
              {dueSoonTasks.length > 0 && (
                <li>• Focus on tasks due within 48 hours</li>
              )}
              {completionRate < 50 && (
                <li>• Rebalance workload across team members</li>
              )}
              <li>• Review project timelines regularly</li>
            </ul>
          </div>
        </div>

        {/* TASKS AT RISK */}
        <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
          <h2 className="font-semibold mb-4">
            ⚠️ Tasks at Risk
          </h2>

          {dueSoonTasks.length === 0 &&
          blockedTasks.length === 0 ? (
            <p className="text-sm text-gray-400">
              No high-risk tasks detected
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              {[...blockedTasks, ...dueSoonTasks]
                .slice(0, 5)
                .map((task) => (
                  <RiskItem
                    key={task.id}
                    title={task.title}
                    priority={task.priority}
                    due={task.due || "—"}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InsightCard({ title, value, description, color }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
      <p className="text-sm text-gray-400 mb-1">
        {title}
      </p>
      <p className={`text-3xl font-semibold ${color}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
}

function RiskItem({ title, priority, due }) {
  return (
    <div className="flex justify-between items-center bg-surface border border-border rounded-xl px-4 py-3">
      <div>
        <p className="font-medium">
          {title}
        </p>
        <p className="text-xs text-gray-400">
          Priority: {priority}
        </p>
      </div>
      <span className="text-xs text-red-400">
        {due}
      </span>
    </div>
  );
}
