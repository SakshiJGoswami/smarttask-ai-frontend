import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AIChatPanel from "../components/ai/AIChatPanel";
import AIFloatingButton from "../components/ai/AIFloatingButton";

const SIDEBAR_WIDTH = 256; // 16rem
const AI_WIDTH = 380; // px

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const role = user?.role || "employee";

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openAI, setOpenAI] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* SIDEBAR */}
      <aside
        className="fixed top-0 left-0 h-full bg-surface border-r border-border p-6 flex flex-col z-30"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-bold">
            ⚡
          </div>
          <span className="text-lg font-semibold">SmartTask AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavLink to={`/${role}`} className={navStyle}>Dashboard</NavLink>
          <NavLink to="/tasks" className={navStyle}>Tasks</NavLink>
          <NavLink to="/projects" className={navStyle}>Projects</NavLink>
          <NavLink to="/profile" className={navStyle}>Profile</NavLink>

          {(role === "admin" || role === "manager") && (
            <>
              <NavLink to="/analytics" className={navStyle}>Analytics</NavLink>
              <NavLink to="/team" className={navStyle}>Team</NavLink>
            </>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto text-sm text-gray-400 hover:text-white"
        >
          Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="transition-all duration-300 p-8"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginRight: openAI ? AI_WIDTH : 0,
        }}
      >
        {children}
      </main>

      {/* AI PANEL */}
      {openAI && (
        <div
          className="fixed top-0 right-0 h-full z-40"
          style={{ width: AI_WIDTH }}
        >
          <AIChatPanel
            onClose={() => setOpenAI(false)}
            role={role}
          />
        </div>
      )}

      {/* FLOATING AI BUTTON */}
      <AIFloatingButton onClick={() => setOpenAI(true)} />
    </div>
  );
}

const navStyle = ({ isActive }) =>
  `block px-4 py-3 rounded-xl transition ${
    isActive
      ? "bg-primary text-white"
      : "text-gray-400 hover:bg-card hover:text-white"
  }`;
