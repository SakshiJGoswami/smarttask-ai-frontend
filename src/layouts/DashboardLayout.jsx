import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AIChatPanel from "../components/ai/AIChatPanel";
import AIFloatingButton from "../components/ai/AIFloatingButton";
export default function DashboardLayout({ children, role = "employee" }) {
const { logout } = useAuth();
  const navigate = useNavigate();
  const [openAI, setOpenAI] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg relative">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border p-6 flex flex-col z-30">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-bold">
            ⚡
          </div>
          <span className="text-lg font-semibold">SmartTask AI</span>
        </div>

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
<NavLink to="/profile">Profile</NavLink>

          {(role === "admin" || role === "manager") && (
            <>
              <NavLink to="/analytics" className={navStyle}>
                Analytics
              </NavLink>
              <NavLink to="/team" className={navStyle}>
                Team
              </NavLink>
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

      {/* MAIN */}
      <main className="ml-64 p-8 max-w-[1600px] mx-auto">
        {children}
      </main>

      {/* FLOATING AI BUTTON */}
      <AIFloatingButton onClick={() => setOpenAI(true)} />

      {/* AI PANEL */}
     {openAI && (
  <AIChatPanel
    onClose={() => setOpenAI(false)}
    role={role}
  />
)}

    </div>
  );
}

const navStyle = ({ isActive }) =>
  `block px-4 py-3 rounded-xl transition ${
    isActive
      ? "bg-primary text-white"
      : "text-gray-400 hover:bg-card hover:text-white"
  }`;
