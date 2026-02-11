import { Bot } from "lucide-react";

export default function AIFloatingButton({
  onClick,
  hasInsight = false,   // ✅ safe default
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Open SmartTask AI Assistant"
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-primary text-white
        flex items-center justify-center
        shadow-xl transition-all duration-200
        hover:scale-105 active:scale-95
        ${hasInsight ? "animate-pulse" : ""}
      `}
      title="Ask SmartTask AI (Ctrl + K)"
    >
      <Bot size={22} />

      {/* ✅ Optional Insight Badge */}
      {hasInsight && (
        <span
          className="
            absolute -top-1 -right-1
            w-3 h-3 rounded-full
            bg-red-500
            border-2 border-white
          "
        />
      )}
    </button>
  );
}
