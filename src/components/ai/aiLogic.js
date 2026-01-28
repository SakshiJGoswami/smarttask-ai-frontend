/* ================= AI LOGIC ================= */

export function generateSmartReply(input, page, role) {
  const msg = input.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello")) {
    return {
      text: "👋 Hi! You can ask me about priorities, risks, or performance.",
      confidence: "High",
    };
  }

  if (msg.includes("priority")) {
    return {
      text:
        role === "employee"
          ? "🎯 Focus on your high-priority task due today."
          : "🎯 Focus on high-priority tasks due within the next 48 hours.",
      confidence: "High",
    };
  }

  if (msg.includes("risk")) {
    return {
      text: "⚠️ 3 tasks are approaching deadlines and may cause delays.",
      confidence: "Medium",
    };
  }

  if (msg.includes("team")) {
    return {
      text:
        role === "manager"
          ? "👥 One team member is overloaded. Consider redistributing tasks."
          : "👥 Team workload is balanced overall.",
      confidence: "Medium",
    };
  }

  if (msg.includes("project")) {
    return {
      text: "📁 One project deadline is at risk next week.",
      confidence: "High",
    };
  }

  return getAutoSuggestion(page, role);
}

/* ================= AUTO SUGGESTIONS ================= */

export function getAutoSuggestion(page, role) {
  const base = {
    analytics: "📊 Analytics are stable. Want insights on productivity?",
    tasks: "📝 You have pending tasks. Ask what to prioritize.",
    projects: "📁 Projects look healthy. Ask about deadlines.",
    team: "👥 Team performance is steady. Ask about workload.",
    dashboard: "⚡ Everything looks stable. Ask me something specific.",
  };

  const roleHint =
    role === "admin"
      ? " As an admin, monitor overall system performance."
      : role === "manager"
      ? " As a manager, focus on deadlines and team balance."
      : " Focus on your assigned priorities.";

  return {
    text: (base[page] || base.dashboard) + roleHint,
    confidence: "Low",
  };
}
