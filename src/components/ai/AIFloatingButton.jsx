import { Bot } from "lucide-react";

export default function AIFloatingButton({ onClick, hasInsight }) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-primary text-white
        flex items-center justify-center
        shadow-xl transition
        hover:scale-105
        ${hasInsight ? "animate-pulse" : ""}
      `}
      title="Ask SmartTask AI (Ctrl + K)"
    >
      <Bot size={22} />
    </button>
  );
}
