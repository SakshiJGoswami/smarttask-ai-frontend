import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* Ensure theme is applied on page load */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleEditProfile = () => navigate("/profile/edit");
  const handleChangePassword = () => navigate("/profile/change-password");

  const handleDeactivateAccount = () => {
    const confirmDeactivate = window.confirm(
      "Are you sure you want to deactivate your account?"
    );

    if (confirmDeactivate) {
      logout();
      alert("Account deactivated (frontend demo)");
      navigate("/");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        {/* PAGE TITLE */}
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-lightMuted dark:text-gray-400">
            Manage your account preferences and application settings
          </p>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="
          bg-lightSurface border border-lightBorder
          dark:bg-surface dark:border-border
          rounded-2xl p-6 space-y-4
        ">
          <h2 className="text-lg font-medium">Account</h2>

          <div className="flex justify-between text-sm">
            <span className="text-lightMuted dark:text-gray-400">Email</span>
            <span>{user?.email || "Logged in user"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-lightMuted dark:text-gray-400">Role</span>
            <span className="capitalize">{user?.role}</span>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 rounded-xl bg-primary text-white"
            >
              Change Password
            </button>

            <button
              onClick={handleEditProfile}
              className="
                px-4 py-2 rounded-xl
                bg-lightCard text-lightText
                dark:bg-card dark:text-gray-300
              "
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* APPLICATION SETTINGS */}
        <div className="
          bg-lightSurface border border-lightBorder
          dark:bg-surface dark:border-border
          rounded-2xl p-6 space-y-4
        ">
          <h2 className="text-lg font-medium">Application</h2>

          {/* DARK MODE */}
          <div className="flex justify-between items-center">
            <span className="text-lightMuted dark:text-gray-400">
              Dark Mode
            </span>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="w-5 h-5 cursor-pointer accent-primary"
            />
          </div>

          {/* AI ASSISTANT */}
          <div className="flex justify-between items-center">
            <span className="text-lightMuted dark:text-gray-400">
              AI Assistant
            </span>
            <span className="text-sm text-lightText dark:text-gray-300">
              Enabled
            </span>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="
          bg-red-100 border border-red-200
          dark:bg-red-500/10 dark:border-red-500/30
          rounded-2xl p-6 space-y-4
        ">
          <h2 className="text-lg font-medium text-red-600 dark:text-red-400">
            Danger Zone
          </h2>

          <button
            onClick={handleDeactivateAccount}
            className="
              px-4 py-2 rounded-xl
              bg-red-600 text-white
              hover:bg-red-700
            "
          >
            Deactivate Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
