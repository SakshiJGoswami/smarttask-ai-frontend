import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import Tasks from "./pages/tasks/Tasks";
import TaskDetail from "./pages/tasks/TaskDetail";
import Projects from "./pages/projects/Projects";
import ProjectDetail from "./pages/projects/ProjectDetail";
import Analytics from "./pages/analytics/Analytics";
import Team from "./pages/team/Team";
import Insights from "./pages/analytics/Insights";

import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/analytics/insights" element={<Insights />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout role="admin">
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* MANAGER */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <DashboardLayout role="manager">
                  <ManagerDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* EMPLOYEE */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <DashboardLayout role="employee">
                  <EmployeeDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* SHARED */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute allowedRoles={["admin","manager","employee"]}>
                <DashboardLayout>
                  <Tasks />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute allowedRoles={["admin","manager","employee"]}>
                <DashboardLayout>
                  <TaskDetail />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["admin","manager","employee"]}>
                <DashboardLayout>
                  <Projects />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute allowedRoles={["admin","manager","employee"]}>
                <DashboardLayout>
                  <ProjectDetail />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={["admin","manager"]}>
                <DashboardLayout role="admin">
                  <Analytics />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/team"
            element={
              <ProtectedRoute allowedRoles={["admin","manager"]}>
                <DashboardLayout role="manager">
                  <Team />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
