import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AIChatPanel from "../components/ai/AIChatPanel";
import AIFloatingButton from "../components/ai/AIFloatingButton";

const SIDEBAR_WIDTH = 256;
const AI_WIDTH = 380;

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
 const role = user?.role?.toLowerCase() || "employee";
 const navigate = useNavigate();
  const [openAI, setOpenAI] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-lightBg text-lightText dark:bg-bg dark:text-white">
      {/* SIDEBAR */}
      <aside
        className="
          fixed top-0 left-0 h-full
          bg-lightSurface border-r border-lightBorder
          dark:bg-surface dark:border-border
          p-6 flex flex-col z-30
        "
        style={{ width: SIDEBAR_WIDTH }}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-bold text-white">
            ⚡
          </div>
          <span className="text-lg font-semibold">SmartTask AI</span>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-2">
          <NavLink to={`/${role}`} className={navStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/tasks" className={navStyle}>
            Tasks
          </NavLink>

          <NavLink to="/projects" className={navStyle}>
            Projects
          </NavLink>

          <NavLink to="/profile" className={navStyle}>
            Profile
          </NavLink>

          <NavLink to="/settings" className={navStyle}>
            Settings
          </NavLink>

       {(role === "admin" || role === "manager") && (
  <div className="pt-4 mt-4 border-t border-lightBorder dark:border-border">
    <p className="text-xs uppercase text-lightMuted mb-2">
      Management
    </p>

    <NavLink to={`/${role}/analytics`} className={navStyle}>
      Analytics
    </NavLink>

    <NavLink to={`/${role}/team`} className={navStyle}>
      Team
    </NavLink>
  </div>
)}

        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            mt-auto text-sm
            text-lightMuted hover:text-lightText
            dark:text-gray-400 dark:hover:text-white
          "
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
          <AIChatPanel onClose={() => setOpenAI(false)} role={role} />
        </div>
      )}

      {/* FLOATING AI BUTTON */}
      <AIFloatingButton onClick={() => setOpenAI(true)} />
    </div>
  );
}

/* ---------------- NAV STYLE ---------------- */

const navStyle = ({ isActive }) =>
  `block px-4 py-3 rounded-xl transition ${
    isActive
      ? "bg-primary text-white"
      : `
        text-lightMuted
        hover:bg-lightCard hover:text-lightText
        dark:text-gray-400
        dark:hover:bg-card dark:hover:text-white
      `
  }`;
