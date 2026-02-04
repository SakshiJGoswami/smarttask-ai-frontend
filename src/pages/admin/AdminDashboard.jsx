import DashboardLayout from "../../layouts/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import AIInsightCard from "../../components/ai/AIInsightCard";
import { useAIInsights } from "../../components/ai/useAIInsights";
/* -------------------- DATA -------------------- */

const performanceData = [
  { month: "Jan", tasks: 400 },
  { month: "Feb", tasks: 600 },
  { month: "Mar", tasks: 750 },
  { month: "Apr", tasks: 900 },
  { month: "May", tasks: 1100 },
  { month: "Jun", tasks: 980 },
  { month: "Jul", tasks: 1200 },
];

const taskDistribution = [
  { name: "Development", value: 45, color: "#7C7CFF" },
  { name: "Design", value: 28, color: "#22d3ee" },
  { name: "Marketing", value: 12, color: "#f472b6" },
];
const aiInsights = useAIInsights("admin", "dashboard");

/* -------------------- PAGE -------------------- */

export default function AdminDashboard() {
  return (
    <DashboardLayout >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">
          Welcome back, managing the SmartTask AI ecosystem.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value="142" note="+12.5%" accent="text-cyan-400" />
        <StatCard title="Completed Tasks" value="2,854" note="This month" accent="text-purple-400" />
        <StatCard title="Team Productivity" value="94.2%" note="High" accent="text-green-400" />
        <StatCard title="Support Tickets" value="12" note="2 pending" accent="text-red-400" />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
  {aiInsights.map((item, index) => (
    <AIInsightCard key={index} {...item} />
  ))}
</div>



      {/* ANALYTICS ROW */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PERFORMANCE TRENDS */}
        <div className="lg:col-span-2 bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Performance Trends</h2>
              <p className="text-sm text-gray-400">
                Monthly task completion analytics
              </p>
            </div>

            <div className="flex gap-2 text-sm">
              <button className="px-4 py-1 rounded-lg bg-card border border-border">
                Week
              </button>
              <button className="px-4 py-1 rounded-lg bg-primary text-white">
                Month
              </button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
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

        {/* TASK DISTRIBUTION */}
        <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass">
          <h2 className="text-lg font-semibold mb-1">Task Distribution</h2>
          <p className="text-sm text-gray-400 mb-4">
            Category wise breakdown
          </p>

          <div className="flex justify-center items-center h-56 relative">
            <PieChart width={220} height={220}>
              <Pie
                data={taskDistribution}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            <div className="absolute text-center">
              <p className="text-2xl font-semibold">82%</p>
              <p className="text-xs text-gray-400">Total Cap</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {taskDistribution.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT PROJECT MILESTONES */}
      <div className="mt-10 bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Project Milestones</h2>
          <button className="text-sm text-primary hover:underline">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-border">
              <tr>
                <th className="text-left py-3">Project Name</th>
                <th className="text-left py-3">Team Lead</th>
                <th className="text-left py-3">Deadline</th>
                <th className="text-left py-3">Progress</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              <ProjectRow
                name="SmartApp Dashboard"
                lead="John Doe"
                deadline="Oct 24, 2024"
                progress={75}
                status="On Track"
                statusColor="bg-green-500/20 text-green-400"
              />

              <ProjectRow
                name="AI Engine v2.0"
                lead="Sarah Chen"
                deadline="Nov 12, 2024"
                progress={45}
                status="In Review"
                statusColor="bg-yellow-500/20 text-yellow-400"
              />

              <ProjectRow
                name="Marketing Portal"
                lead="Mike Ross"
                deadline="Oct 30, 2024"
                progress={90}
                status="Almost Done"
                statusColor="bg-cyan-500/20 text-cyan-400"
              />
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* -------------------- COMPONENTS -------------------- */

function StatCard({ title, value, note, accent }) {
  return (
    <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-5 shadow-glass">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <h2 className={`text-3xl font-semibold ${accent}`}>{value}</h2>
      <p className="text-xs text-gray-400 mt-2">{note}</p>
    </div>
  );
}

function ProjectRow({ name, lead, deadline, progress, status, statusColor }) {
  return (
    <tr>
      <td className="py-4">{name}</td>
      <td className="py-4">{lead}</td>
      <td className="py-4 text-gray-400">{deadline}</td>

      <td className="py-4 w-48">
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </td>

      <td className="py-4">
        <span className={`px-3 py-1 rounded-full text-xs ${statusColor}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}
