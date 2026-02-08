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
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

/* -------------------- PAGE -------------------- */

export default function AdminDashboard() {
  const aiInsights = useAIInsights("admin", "dashboard");
  const { tasks } = useTasks();
  const { projects } = useProjects();

  /* -------------------- BASIC STATS -------------------- */

  const totalProjects = projects.length;
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const productivity =
    totalTasks === 0
      ? "0%"
      : `${Math.round((completedTasks / totalTasks) * 100)}%`;

  /* -------------------- ADVANCED ANALYTICS -------------------- */

  // Frontend-safe date simulation
  const now = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);

  const weeklyCompleted = tasks.filter(
    (t) =>
      t.status === "Completed" &&
      t.completedAt &&
      new Date(t.completedAt) >= lastWeek
  ).length;

  const weeklyPending = tasks.filter(
    (t) => t.status !== "Completed"
  ).length;

  const overdueTasks = tasks.filter(
    (t) =>
      t.due &&
      new Date(t.due) < now &&
      t.status !== "Completed"
  ).length;

  const onHoldProjects = projects.filter(
    (p) => p.status === "On Hold"
  ).length;

  const trendUp = weeklyCompleted > weeklyPending;

  /* -------------------- PIE DATA -------------------- */

  const taskDistribution = [
    { name: "Completed", value: completedTasks, color: "#22c55e" },
    { name: "Pending", value: pendingTasks, color: "#facc15" },
  ];

  /* -------------------- LINE CHART DATA -------------------- */

  const performanceData = [
    { label: "Jan", value: Math.max(0, totalTasks - 6) },
    { label: "Feb", value: Math.max(0, totalTasks - 5) },
    { label: "Mar", value: Math.max(0, totalTasks - 4) },
    { label: "Apr", value: Math.max(0, totalTasks - 3) },
    { label: "May", value: Math.max(0, totalTasks - 2) },
    { label: "Jun", value: Math.max(0, totalTasks - 1) },
    { label: "Jul", value: totalTasks },
  ];

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">
          Admin Dashboard
        </h1>
        <p className="text-sm text-lightMuted dark:text-gray-400">
          System-wide overview and advanced analytics
        </p>
      </div>

      {/* CORE STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={totalProjects} />
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="Completed Tasks" value={completedTasks} />
        <StatCard title="Productivity" value={productivity} />
      </div>

      {/* ADVANCED ANALYTICS */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Completed (This Week)"
          value={weeklyCompleted}
          accent="text-green-500"
        />
        <StatCard
          title="Pending Tasks"
          value={weeklyPending}
          accent="text-yellow-500"
        />
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks}
          accent="text-red-500"
        />
        <StatCard
          title="Projects On Hold"
          value={onHoldProjects}
          accent="text-red-500"
        />
      </div>

      {/* TREND INDICATOR */}
      <div className="mt-6 p-5 rounded-2xl bg-lightSurface border dark:bg-card">
        <p className="text-sm">
          📈 Weekly Productivity Trend:{" "}
          <strong
            className={
              trendUp ? "text-green-500" : "text-red-500"
            }
          >
            {trendUp ? "Improving" : "Needs Attention"}
          </strong>
        </p>
      </div>

      {/* AI INSIGHTS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiInsights.map((item, index) => (
          <AIInsightCard key={index} {...item} />
        ))}
      </div>

      {/* CHARTS */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-lightSurface border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Task Growth (Simulated)
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-lightSurface border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Task Distribution
          </h2>
          <PieChart width={220} height={220}>
            <Pie
              data={taskDistribution}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
            >
              {taskDistribution.map((item, i) => (
                <Cell key={i} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* -------------------- COMPONENT -------------------- */

function StatCard({ title, value, accent = "text-primary" }) {
  return (
    <div className="bg-lightSurface border rounded-2xl p-5">
      <p className="text-sm text-lightMuted mb-2">{title}</p>
      <h2 className={`text-3xl font-semibold ${accent}`}>
        {value}
      </h2>
    </div>
  );
}
