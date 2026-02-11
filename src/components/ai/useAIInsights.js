export function useAIInsights(role, page) {
  // ✅ PRIORITY 1 → Page-specific insights
  if (page === "analytics") {
    return [
      {
        title: "Trend Insight",
        insight: "📈 Overall productivity increased by 12% this month.",
        confidence: "High",
      },
      {
        title: "Bottleneck Warning",
        insight: "⚠️ Tasks marked 'Blocked' increased this week.",
        confidence: "Medium",
      },
    ];
  }

  if (page === "tasks") {
    return [
      {
        title: "Completion Pattern",
        insight: "✅ Most tasks are completed close to deadlines.",
        confidence: "Medium",
      },
    ];
  }

  if (page === "projects") {
    return [
      {
        title: "Project Stability",
        insight: "📁 Active projects are progressing steadily.",
        confidence: "High",
      },
    ];
  }

  // ✅ PRIORITY 2 → Role-based insights

  const roleInsights = {
    admin: [
      {
        title: "Task Risk Alert",
        insight: "🚨 5 high-priority tasks are approaching deadlines.",
        confidence: "High",
      },
      {
        title: "Team Performance",
        insight: "📉 Design team productivity dropped slightly this week.",
        confidence: "Medium",
      },
    ],

    manager: [
      {
        title: "Project Health",
        insight: "⚠️ One project may miss its deadline without intervention.",
        confidence: "High",
      },
      {
        title: "Resource Allocation",
        insight: "👥 Reassigning 1 developer could speed up delivery.",
        confidence: "Medium",
      },
    ],

    employee: [
      {
        title: "Today’s Focus",
        insight: "🎯 Complete the high-priority task due today.",
        confidence: "High",
      },
      {
        title: "Productivity Tip",
        insight: "⏰ Morning focus hours are your most productive.",
        confidence: "Low",
      },
    ],
  };

  return roleInsights[role] || [];
}
