import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import AIChatPanel from "../../components/ai/AIChatPanel";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function AIAssistant() {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const taskContext = location.state?.taskContext || null;

  return (
    <DashboardLayout>
      <div className="relative min-h-[70vh]">
        {open && (
          <AIChatPanel
            role={user?.role}
            onClose={() => setOpen(false)}
            taskContext={taskContext}
          />
        )}

        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Open AI Assistant
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}
