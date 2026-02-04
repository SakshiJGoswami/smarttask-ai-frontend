import DashboardLayout from "../../layouts/DashboardLayout";
import AIInsightCard from "../../components/ai/AIInsightCard";
import { useAIInsights } from "../../components/ai/useAIInsights";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const taskData = [
  { month: "Jan", tasks: 420 },
  { month: "Feb", tasks: 680 },
  { month: "Mar", tasks: 820 },
  { month: "Apr", tasks: 980 },
  { month: "May", tasks: 1150 },
  { month: "Jun", tasks: 1020 },
  { month: "Jul", tasks: 1280 },
];

export default function Analytics() {
  const { user } = useAuth();
  const aiInsights = useAIInsights(user.role, "analytics");
}


const productivityData = [
  { team: "Dev", value: 92 },
  { team: "Design", value: 85 },
  { team: "QA", value: 78 },
  { team: "Marketing", value: 70 },
];

export default function Analytics() {
  return (
    <DashboardLayout >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Analytics</h1>
        <p className="text-sm text-gray-400">
          Track performance and productivity insights.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Total Tasks" value="2,854" />
        <KpiCard title="Completed" value="2,340" />
        <KpiCard title="Pending" value="514" />
        <KpiCard title="Avg Productivity" value="86%" />
      </div>
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
  {aiInsights.map((item, i) => (
    <AIInsightCard key={i} {...item} />
  ))}
</div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LINE CHART */}
        <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass">
          <h2 className="text-lg font-semibold mb-4">
            Task Completion Trend
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskData}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#7C7CFF"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass">
          <h2 className="text-lg font-semibold mb-4">
            Team Productivity
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData}>
                <XAxis dataKey="team" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-5 shadow-glass">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <h2 className="text-3xl font-semibold text-primary">{value}</h2>
    </div>
  );
}
