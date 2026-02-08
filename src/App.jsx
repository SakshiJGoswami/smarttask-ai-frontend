import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Settings from "./pages/settings/Settings";

import Tasks from "./pages/tasks/Tasks";
import TaskDetail from "./pages/tasks/TaskDetail";
import EditTask from "./pages/tasks/EditTask";
import CreateTask from "./pages/tasks/CreateTask";

import Projects from "./pages/projects/Projects";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetail from "./pages/projects/ProjectDetail";
import EditProject from "./pages/projects/EditProject";

import Analytics from "./pages/analytics/Analytics";
import Team from "./pages/team/Team";
import Insights from "./pages/analytics/Insights";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/analytics/insights" element={<Insights />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/team"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Team />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/analytics"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/team"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Team />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

      {/* TASKS */}
<Route
  path="/tasks"
  element={
    <ProtectedRoute allowedRoles={["admin","manager","employee"]}>
      <Tasks />
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks/create"
  element={
    <ProtectedRoute allowedRoles={["admin","manager"]}>
      <CreateTask />
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks/:id"
  element={
    <ProtectedRoute allowedRoles={["admin","manager","employee"]}>
      <TaskDetail />
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks/:id/edit"
  element={
    <ProtectedRoute allowedRoles={["admin","manager"]}>
      <EditTask />
    </ProtectedRoute>
  }
/>


        {/* PROJECTS */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <ProjectDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <EditProject />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
