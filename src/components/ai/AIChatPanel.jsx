import { useState, useEffect } from "react";
import { Send, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { getAutoSuggestion } from "./aiLogic";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

export default function AIChatPanel({ onClose, role, taskContext }) {
  const location = useLocation();
  const page = location.pathname.replace("/", "") || "dashboard";

  const { tasks } = useTasks();
  const { projects } = useProjects();

  const STORAGE_KEY = `ai-chat-${page}-${role}`;
  const AUTO_KEY = `ai-auto-${page}-${role}`;

  /* ---------------- SAFE LOAD ---------------- */

  const loadStoredMessages = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  /* ---------------- STATE ---------------- */

  const [messages, setMessages] = useState(() => {
    const stored = loadStoredMessages();
    if (stored) return stored;

    if (taskContext) {
      return [
        {
          role: "ai",
          text: `🤖 I’m analyzing this task:

• Title: ${taskContext.title}
• Status: ${taskContext.status}
• Priority: ${taskContext.priority}
• Due: ${taskContext.dueDate || "N/A"}
• Assigned To: ${taskContext.assignedTo || "N/A"}

Ask me about risks, delays, or next steps.`,
          confidence: "High",
        },
      ];
    }

    return [
      {
        role: "ai",
        text: `👋 Hi! I’m SmartTask AI. I’ll assist you on ${page}.`,
        confidence: "Low",
      },
    ];
  });

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  /* ---------------- PERSIST CHAT ---------------- */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, STORAGE_KEY]);

  /* ---------------- AUTO SUGGESTION ---------------- */

  useEffect(() => {
    if (taskContext) return;
    if (localStorage.getItem(AUTO_KEY)) return;

    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          ...getAutoSuggestion(page, role),
        },
      ]);

      localStorage.setItem(AUTO_KEY, "true");
    }, 600);

    return () => clearTimeout(timer);
  }, [page, role, taskContext, AUTO_KEY]);

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async (text = input) => {
    if (!text.trim() || thinking) return;

    const userMessage = { role: "user", text };

    // ✅ ALWAYS use functional update to avoid stale state bug
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    try {
      const api = (await import("../../services/apiClient")).default;

      const res = await api.post("/ai/chat", {
        messages: [...messages, userMessage],
        taskContext,
        pageContext: page,
      });

      const aiReply = res.data?.reply;

      if (aiReply?.text) {
        setMessages((prev) => [...prev, aiReply]);
      } else {
        throw new Error("Invalid AI reply");
      }
    } catch (error) {
      console.error("AI CHAT ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "🤖 AI server unavailable. Please try again.",
          confidence: "Low",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  /* ---------------- CLEAR CHAT ---------------- */

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTO_KEY);

    setMessages([
      {
        role: "ai",
        text: "🧹 Chat cleared. How can I help?",
        confidence: "Low",
      },
    ]);
  };

  /* ---------------- QUICK QUESTIONS ---------------- */

  const quickQuestions = taskContext
    ? [
        "What are the risks?",
        "What should I do next?",
        "Is this task delayed?",
      ]
    : [
        "What should I prioritize?",
        "Any risks?",
        "Project summary?",
      ];

  /* ---------------- UI ---------------- */

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 z-50 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.aside
          className="
            w-[380px] h-full flex flex-col
            bg-lightSurface border-l border-lightBorder
            dark:bg-card dark:border-border
          "
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
        >
          {/* HEADER */}
          <div className="p-5 border-b border-lightBorder dark:border-border flex justify-between">
            <div>
              <p className="font-semibold">SmartTask AI</p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {(role ?? "employee").toUpperCase()} • Context Loaded
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={clearChat} title="Clear chat">
                <Trash2 size={18} />
              </button>
              <button onClick={onClose} title="Close AI">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* CHAT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-lightCard border border-lightBorder dark:bg-surface dark:border-border"
                }`}
              >
                {m.text}

                {m.role === "ai" && m.confidence && (
                  <div className="mt-2 text-xs text-lightMuted">
                    Confidence:{" "}
                    <span className="text-primary">{m.confidence}</span>
                  </div>
                )}
              </div>
            ))}

            {thinking && (
              <p className="text-xs text-lightMuted italic">
                SmartTask AI is thinking…
              </p>
            )}
          </div>

          {/* QUICK QUESTIONS */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={thinking}
                className="
                  px-3 py-1 rounded-full text-xs
                  bg-lightCard border border-lightBorder
                  dark:bg-card dark:border-border
                  hover:bg-primary/20
                  disabled:opacity-50
                "
              >
                {q}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-lightBorder dark:border-border">
            <div className="flex items-center gap-2 bg-lightBg border border-lightBorder dark:bg-surface dark:border-border rounded-xl px-3">
              <input
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                placeholder="Ask AI..."
                value={input}
                disabled={thinking}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
              />
              <button
                onClick={() => sendMessage()}
                disabled={thinking}
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
