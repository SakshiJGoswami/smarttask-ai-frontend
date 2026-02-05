import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated (frontend demo)");
    navigate("/profile");
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>

        <div className="
          bg-lightSurface border border-lightBorder
          dark:bg-surface dark:border-border
          rounded-2xl p-6 space-y-4
        ">
          <div>
            <label className="text-sm text-lightMuted dark:text-gray-400">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full mt-1 px-4 py-2 rounded-xl
                bg-lightBg text-lightText border border-lightBorder
                dark:bg-card dark:text-white dark:border-border
              "
            />
          </div>

          <div>
            <label className="text-sm text-lightMuted dark:text-gray-400">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              disabled
              className="
                w-full mt-1 px-4 py-2 rounded-xl
                bg-lightBg text-lightMuted border border-lightBorder
                dark:bg-card dark:text-gray-400 dark:border-border
              "
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-primary text-white"
            >
              Save Changes
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="
                px-4 py-2 rounded-xl
                bg-lightCard text-lightText
                dark:bg-card dark:text-gray-300
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
