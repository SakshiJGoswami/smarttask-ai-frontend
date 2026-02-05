import React from "react";
import AIChatPanel from "../../components/ai/AIChatPanel";

export default function AIAssistant() {
  return (
    <div className="p-6">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-lightText dark:text-white">
          AI Assistant
        </h1>
        <p className="text-sm text-lightMuted dark:text-slate-400 mt-1">
          Ask questions about tasks, projects, risks, or productivity.
        </p>
      </div>

      {/* AI CHAT PANEL */}
      <div className="h-[calc(100vh-180px)]">
        <AIChatPanel />
      </div>
    </div>
  );
}
