import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    setLoading(true);

    // ⏳ Fake async save (frontend demo)
    setTimeout(() => {
      updateProfile({ name: form.name });
      setLoading(false);
      alert("Profile updated successfully");
      navigate("/profile");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>

        <div className="
          bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl p-6 space-y-4
        ">
          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {/* NAME */}
          <div>
            <label className="text-sm text-lightMuted dark:text-gray-400">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              className="
                w-full mt-1 px-4 py-2 rounded-xl
                bg-lightBg text-lightText border border-lightBorder
                dark:bg-surface dark:text-white dark:border-border
                disabled:opacity-60
              "
            />
          </div>

          {/* EMAIL (READ ONLY) */}
          <div>
            <label className="text-sm text-lightMuted dark:text-gray-400">
              Email
            </label>
            <input
              value={form.email}
              disabled
              className="
                w-full mt-1 px-4 py-2 rounded-xl
                bg-lightBg text-lightMuted border border-lightBorder
                dark:bg-surface dark:text-gray-400 dark:border-border
              "
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="
                px-4 py-2 rounded-xl
                bg-primary text-white
                disabled:opacity-60
              "
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => navigate("/profile")}
              disabled={loading}
              className="
                px-4 py-2 rounded-xl
                bg-lightCard text-lightText
                dark:bg-card dark:text-gray-300
                disabled:opacity-60
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
