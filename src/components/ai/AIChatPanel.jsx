import { useState, useEffect } from "react";
import { Send, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { generateSmartReply, getAutoSuggestion } from "./aiLogic";

export default function AIChatPanel({ onClose, role }) {
  const location = useLocation();
  const page = location.pathname.replace("/", "") || "dashboard";

  const STORAGE_KEY = `ai-chat-${page}-${role}`;
  const AUTO_KEY = `ai-auto-${page}-${role}`;

  /* ---------------- STATE ---------------- */

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
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
    if (localStorage.getItem(AUTO_KEY)) return;

    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", ...getAutoSuggestion(page, role) },
      ]);
      localStorage.setItem(AUTO_KEY, "true");
    }, 600);

    return () => clearTimeout(timer);
  }, [page, role, AUTO_KEY]);

  /* ---------------- CTRL + K ---------------- */

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = (text = input) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const reply = generateSmartReply(text, page, role);
      setMessages((prev) => [...prev, { role: "ai", ...reply }]);
      setThinking(false);
    }, 900);
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

  const quickQuestions = [
    "What should I prioritize?",
    "Any risks?",
    "Team performance?",
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
            backdrop-blur-xl
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
                {(role ?? "employee").toUpperCase()}
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
                    : `
                      bg-lightCard text-lightText border border-lightBorder
                      dark:bg-surface dark:border-border
                    `
                }`}
              >
                {m.text}

                {m.role === "ai" && m.confidence && (
                  <div className="mt-2 text-xs text-lightMuted dark:text-gray-400">
                    Confidence:{" "}
                    <span className="text-primary">{m.confidence}</span>
                  </div>
                )}
              </div>
            ))}

            {thinking && (
              <p className="text-xs text-lightMuted dark:text-gray-400 italic">
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
                className="
                  px-3 py-1 rounded-full text-xs
                  bg-lightCard border border-lightBorder
                  dark:bg-card dark:border-border
                  hover:bg-primary/20
                "
              >
                {q}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-lightBorder dark:border-border">
            <div className="
              flex items-center gap-2
              bg-lightBg border border-lightBorder
              dark:bg-surface dark:border-border
              rounded-xl px-3
            ">
              <input
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                placeholder={`Ask about ${page}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={() => sendMessage()}
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white"
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
