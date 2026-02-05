import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

/* ================= MOCK DATA ================= */

const initialTeamMembers = [
  {
    id: 1,
    name: "Sakshi Goswami",
    email: "admin@company.com",
    role: "Admin",
    status: "Active",
    tasks: [],
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "manager@company.com",
    role: "Manager",
    status: "Active",
    tasks: [],
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "user@company.com",
    role: "Employee",
    status: "Active",
    tasks: [],
  },
];

/* ================= API-READY SERVICES ================= */

const teamService = {
  updateMember(list, updated) {
    return list.map((m) => (m.id === updated.id ? updated : m));
  },

  assignTask(list, memberId, task) {
    return list.map((m) =>
      m.id === memberId
        ? { ...m, tasks: [...m.tasks, task] }
        : m
    );
  },
};

/* ================= PAGE ================= */

export default function Team() {
  const [members, setMembers] = useState(initialTeamMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [editingMember, setEditingMember] = useState(null);
  const [assigningMember, setAssigningMember] = useState(null);

  /* ---------- FILTER LOGIC ---------- */

  const filteredMembers = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      roleFilter === "All" || m.role === roleFilter;

    return matchSearch && matchRole;
  });

  /* ---------- ACTIONS ---------- */

  const handleView = (m) => {
    alert(
      `Name: ${m.name}
Email: ${m.email}
Role: ${m.role}
Tasks: ${m.tasks.length || "None"}`
    );
  };

  const handleEditSave = (updated) => {
    setMembers((prev) =>
      teamService.updateMember(prev, updated)
    );
    setEditingMember(null);
  };

  const handleAssignTask = (memberId, task) => {
    setMembers((prev) =>
      teamService.assignTask(prev, memberId, task)
    );
    setAssigningMember(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Team</h1>
          <p className="text-sm text-lightMuted dark:text-gray-400">
            Manage members, roles and tasks
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-wrap gap-4">
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-lightBorder dark:border-border bg-transparent"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-lightBorder dark:border-border bg-transparent"
          >
            <option>All</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((m) => (
            <TeamCard
              key={m.id}
              member={m}
              onView={() => handleView(m)}
              onEdit={() => setEditingMember(m)}
              onAssign={() => setAssigningMember(m)}
            />
          ))}
        </div>
      </div>

      {editingMember && (
        <EditModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleEditSave}
        />
      )}

      {assigningMember && (
        <AssignTaskModal
          member={assigningMember}
          onClose={() => setAssigningMember(null)}
          onAssign={handleAssignTask}
        />
      )}
    </DashboardLayout>
  );
}

/* ================= CARD ================= */

function TeamCard({ member, onView, onEdit, onAssign }) {
  return (
    <div className="bg-lightSurface dark:bg-card border border-lightBorder dark:border-border rounded-2xl p-6">
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold mb-4">
        {member.name[0]}
      </div>

      <h3 className="font-semibold">{member.name}</h3>
      <p className="text-sm text-lightMuted dark:text-gray-400">
        {member.email}
      </p>

      <div className="flex gap-2 mt-3">
        <span className="px-3 py-1 text-xs rounded-full bg-lightCard dark:bg-surface">
          {member.role}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
          {member.status}
        </span>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onView} className="flex-1 py-2 text-sm border rounded-lg">
          View
        </button>
        <button onClick={onEdit} className="flex-1 py-2 text-sm bg-primary text-white rounded-lg">
          Edit
        </button>
        <button onClick={onAssign} className="flex-1 py-2 text-sm bg-indigo-500 text-white rounded-lg">
          Assign
        </button>
      </div>
    </div>
  );
}

/* ================= EDIT MODAL ================= */

function EditModal({ member, onClose, onSave }) {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);

  return (
    <Modal title="Edit Member" onClose={onClose}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="input"
      >
        <option>Admin</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      <ModalActions
        onCancel={onClose}
        onConfirm={() => onSave({ ...member, name, role })}
      />
    </Modal>
  );
}

/* ================= ASSIGN TASK MODAL ================= */

function AssignTaskModal({ member, onClose, onAssign }) {
  const [task, setTask] = useState("");

  return (
    <Modal title={`Assign Task to ${member.name}`} onClose={onClose}>
      <input
        placeholder="Task title"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="input"
      />

      <ModalActions
        onCancel={onClose}
        onConfirm={() => onAssign(member.id, task)}
      />
    </Modal>
  );
}

/* ================= SHARED UI ================= */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-lightSurface dark:bg-card w-full max-w-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
        <button onClick={onClose} className="hidden" />
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onConfirm }) {
  return (
    <div className="flex gap-4 mt-6">
      <button onClick={onConfirm} className="flex-1 bg-primary text-white py-2 rounded-xl">
        Save
      </button>
      <button onClick={onCancel} className="flex-1 border py-2 rounded-xl">
        Cancel
      </button>
    </div>
  );
}
