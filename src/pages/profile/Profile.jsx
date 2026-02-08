import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleDeactivateAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate your account?"
    );

    if (confirmed) {
      logout();
      alert("Account deactivated (frontend demo)");
      navigate("/");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ✅ PROFILE HEADER (REUSABLE COMPONENT) */}
        <ProfileHeader user={user} />

        {/* PROFILE CARD */}
        <div
          className="
            bg-lightSurface border border-lightBorder
            dark:bg-card dark:border-border
            rounded-2xl p-6 flex gap-6 items-center
          "
        >
          {/* AVATAR */}
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white">
            {user?.name?.charAt(0) || "U"}
          </div>

          {/* BASIC INFO */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {user?.name || "User Name"}
            </h2>
            <p className="text-sm text-lightMuted dark:text-gray-400">
              {user?.email || "user@email.com"}
            </p>

            <span
              className="
                inline-block mt-2 px-3 py-1 text-xs rounded-full
                bg-primary/10 text-primary
                dark:bg-surface dark:text-gray-300
              "
            >
              Role: {user?.role}
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ACCOUNT INFO */}
          <div
            className="
              bg-lightSurface border border-lightBorder
              dark:bg-card dark:border-border
              rounded-2xl p-6
            "
          >
            <h3 className="font-semibold mb-4">
              Account Information
            </h3>

            <ProfileRow label="Full Name" value={user?.name} />
            <ProfileRow label="Email" value={user?.email} />
            <ProfileRow label="Role" value={user?.role} />
            <ProfileRow label="Status" value="Active" />
          </div>

          {/* SECURITY (VIEW ONLY) */}
          <div
            className="
              bg-lightSurface border border-lightBorder
              dark:bg-card dark:border-border
              rounded-2xl p-6
            "
          >
            <h3 className="font-semibold mb-4">Security</h3>

            <ProfileRow label="Password" value="********" />
            <ProfileRow label="2FA" value="Disabled" />

            <p className="text-xs text-lightMuted dark:text-gray-400 mt-4">
              Password change will be handled via backend in future.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={handleEditProfile}
            className="px-6 py-2 rounded-xl bg-primary text-white"
          >
            Edit Profile
          </button>

          <button
            onClick={handleDeactivateAccount}
            className="
              px-6 py-2 rounded-xl
              bg-red-100 text-red-600
              dark:bg-red-500/20 dark:text-red-400
            "
          >
            Deactivate Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- COMPONENT ---------------- */

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-lightBorder dark:border-border last:border-none">
      <span className="text-sm text-lightMuted dark:text-gray-400">
        {label}
      </span>
      <span className="text-sm font-medium">
        {value || "-"}
      </span>
    </div>
  );
}
