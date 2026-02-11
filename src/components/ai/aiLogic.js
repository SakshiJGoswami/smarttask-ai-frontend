/* ================= AI SMART LOGIC ================= */

export function generateSmartReply(input, page, role) {
  const msg = input.toLowerCase().trim();

  /* -------- GREETING -------- */
  if (isGreeting(msg)) {
    return {
      text: "👋 Hi! Ask me about priorities, risks, deadlines, or performance.",
      confidence: "High",
    };
  }

  /* -------- PRIORITY -------- */
  if (containsWord(msg, "priority") || containsWord(msg, "prioritize")) {
    return {
      text:
        role === "employee"
          ? "🎯 Focus on your highest-priority active task."
          : "🎯 Review high-priority tasks due soon.",
      confidence: "High",
    };
  }

  /* -------- RISK / DELAY -------- */
  if (
    containsWord(msg, "risk") ||
    containsWord(msg, "delay") ||
    containsWord(msg, "deadline")
  ) {
    return {
      text:
        page === "projects"
          ? "⚠️ Some project deadlines may need attention."
          : "⚠️ A few tasks are nearing deadlines.",
      confidence: "Medium",
    };
  }

  /* -------- TEAM -------- */
  if (containsWord(msg, "team") || containsWord(msg, "workload")) {
    return {
      text:
        role === "manager"
          ? "👥 Team workload shows mild imbalance."
          : "👥 Team performance looks steady.",
      confidence: "Medium",
    };
  }

  /* -------- PROJECT -------- */
  if (containsWord(msg, "project")) {
    return {
      text: "📁 Projects are progressing normally overall.",
      confidence: "High",
    };
  }

  /* -------- PERFORMANCE / PRODUCTIVITY -------- */
  if (
    containsWord(msg, "performance") ||
    containsWord(msg, "productivity")
  ) {
    return {
      text:
        role === "employee"
          ? "📈 Your productivity trend looks consistent."
          : "📈 Overall productivity is stable.",
      confidence: "Medium",
    };
  }

  /* -------- DEFAULT FALLBACK -------- */
  return getAutoSuggestion(page, role);
}

/* ================= AUTO SUGGESTIONS ================= */

export function getAutoSuggestion(page, role) {
  const base = {
    analytics:
      "📊 Analytics are stable. Want insights on productivity?",
    tasks:
      "📝 You have active tasks. Ask what to prioritize.",
    projects:
      "📁 Projects look healthy. Ask about deadlines.",
    team:
      "👥 Team activity is steady. Ask about workload.",
    dashboard:
      "⚡ Everything looks stable. Ask me something specific.",
  };

  const roleHint =
    role === "admin"
      ? " As an admin, monitor system-wide performance."
      : role === "manager"
      ? " As a manager, track deadlines and team balance."
      : " Focus on your assigned priorities.";

  return {
    text: (base[page] || base.dashboard) + roleHint,
    confidence: "Low",
  };
}

/* ================= HELPERS ================= */

function isGreeting(msg) {
  return (
    msg === "hi" ||
    msg === "hello" ||
    msg === "hey" ||
    msg.startsWith("hi ") ||
    msg.startsWith("hello ")
  );
}

function containsWord(msg, word) {
  const regex = new RegExp(`\\b${word}\\b`, "i");
  return regex.test(msg);
}
