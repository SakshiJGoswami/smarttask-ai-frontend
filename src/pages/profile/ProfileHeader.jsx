import React from "react";

export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
          {user.name?.charAt(0) || "U"}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-lightText dark:text-white">
            {user.name}
          </h2>
          <p className="text-sm text-lightMuted dark:text-slate-400">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
