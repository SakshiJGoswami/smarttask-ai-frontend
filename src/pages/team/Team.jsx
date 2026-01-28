import DashboardLayout from "../../layouts/DashboardLayout";

/* -------------------- MOCK DATA -------------------- */

const teamMembers = [
  {
    id: 1,
    name: "Sakshi Goswami",
    email: "admin@company.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "manager@company.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "user@company.com",
    role: "Employee",
    status: "Active",
  },
  {
    id: 4,
    name: "Neha Verma",
    email: "employee@company.com",
    role: "Employee",
    status: "Active",
  },
];

/* -------------------- PAGE -------------------- */

export default function Team() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-10">

        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Team</h1>
            <p className="text-sm text-gray-400">
              Manage your organization members.
            </p>
          </div>

          <button className="bg-primary hover:opacity-90 transition px-6 py-2.5 rounded-xl font-medium">
            + Add Member
          </button>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}

/* -------------------- COMPONENT -------------------- */

function TeamCard({ member }) {
  return (
    <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 shadow-glass max-w-[360px]">

      {/* AVATAR */}
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-semibold text-white mb-4">
        {member.name.charAt(0)}
      </div>

      {/* INFO */}
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{member.email}</p>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-3 py-1 rounded-full text-xs bg-surface border border-border">
          {member.role}
        </span>
        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
          {member.status}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex-1 bg-surface hover:bg-card transition py-2 rounded-lg border border-border text-sm">
          View
        </button>
        <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 transition py-2 rounded-lg text-red-400 text-sm">
          Remove
        </button>
      </div>
    </div>
  );
}
