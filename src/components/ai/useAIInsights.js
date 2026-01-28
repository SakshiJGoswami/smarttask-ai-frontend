export function useAIInsights(role, page) {
  // 🔹 ADMIN
  if (role === "admin") {
    return [
      {
        title: "Task Risk Alert",
        insight: "5 high-priority tasks are approaching deadlines.",
        confidence: "High",
      },
      {
        title: "Team Performance",
        insight: "Design team productivity dropped slightly this week.",
        confidence: "Medium",
      },
    ];
  }

  // 🔹 MANAGER
  if (role === "manager") {
    return [
      {
        title: "Project Health",
        insight: "One project may miss its deadline without intervention.",
        confidence: "High",
      },
      {
        title: "Resource Allocation",
        insight: "Reassigning 1 developer could speed up delivery.",
        confidence: "Medium",
      },
    ];
  }

  // 🔹 EMPLOYEE
  if (role === "employee") {
    return [
      {
        title: "Today’s Focus",
        insight: "Complete the high-priority task due today.",
        confidence: "High",
      },
      {
        title: "Productivity Tip",
        insight: "Morning focus hours are your most productive.",
        confidence: "Low",
      },
    ];
  }

  // 🔹 ANALYTICS PAGE
  if (page === "analytics") {
    return [
      {
        title: "Trend Insight",
        insight: "Overall productivity increased by 12% this month.",
        confidence: "High",
      },
    ];
  }

  return [];
}
