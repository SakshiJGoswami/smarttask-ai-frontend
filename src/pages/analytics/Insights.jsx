import DashboardLayout from "../../layouts/DashboardLayout";

export default function Insights() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* PAGE HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">AI Insights</h1>
          <p className="text-gray-400 text-sm">
            SmartTask AI analyzes your tasks and projects to provide actionable insights.
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard
            title="Weekly Summary"
            value="+12%"
            description="Overall productivity increased compared to last week."
            color="text-green-400"
          />

          <InsightCard
            title="Project Health"
            value="84%"
            description="Most projects are on track, but a few need attention."
            color="text-primary"
          />

          <InsightCard
            title="Risk Level"
            value="Medium"
            description="5 tasks are approaching deadlines within 48 hours."
            color="text-yellow-400"
          />
        </div>

        {/* DETAILED INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* AI SUMMARY */}
          <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
            <h2 className="font-semibold mb-3">📊 AI Summary</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your team has shown consistent progress this week. Task completion
              rate improved by <strong>12%</strong>, and most high-priority tasks
              are on schedule. However, some critical tasks may cause delays if
              not addressed soon.
            </p>
          </div>

          {/* SUGGESTIONS */}
          <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
            <h2 className="font-semibold mb-3">💡 AI Suggestions</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>• Reassign completed-team members to overdue tasks</li>
              <li>• Review deadlines for high-priority items</li>
              <li>• Schedule a quick stand-up meeting for blockers</li>
              <li>• Focus on “Due Soon” tasks first</li>
            </ul>
          </div>
        </div>

        {/* RISK TASKS */}
        <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
          <h2 className="font-semibold mb-4">⚠️ Tasks at Risk</h2>

          <div className="space-y-3 text-sm">
            <RiskItem
              title="Design Dashboard UI"
              priority="High"
              due="Today"
            />
            <RiskItem
              title="Integrate Auth Middleware"
              priority="High"
              due="Tomorrow"
            />
            <RiskItem
              title="Prepare Sprint Report"
              priority="Medium"
              due="In 2 days"
            />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InsightCard({ title, value, description, color }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl shadow-glass">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className={`text-3xl font-semibold ${color}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-2">{description}</p>
    </div>
  );
}

function RiskItem({ title, priority, due }) {
  return (
    <div className="flex justify-between items-center bg-surface border border-border rounded-xl px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
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
