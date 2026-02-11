export default function AIInsightCard({
  title = "Insight",
  insight = "No insight available.",
  confidence = "Low", // ✅ safe fallback
}) {
  const confidenceColor = {
    High: "text-green-600 dark:text-green-400",
    Medium: "text-yellow-600 dark:text-yellow-400",
    Low: "text-lightMuted dark:text-gray-400",
  };

  const colorClass =
    confidenceColor[confidence] || confidenceColor.Low;

  return (
    <div
      className="
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-5
      "
      aria-live="polite"
    >
      {/* HEADER */}
      <p className="text-xs text-lightMuted dark:text-gray-400 mb-1">
        🤖 AI INSIGHT
      </p>

      {/* TITLE */}
      <h3 className="font-semibold mb-2">
        {title}
      </h3>

      {/* INSIGHT TEXT */}
      <p className="text-sm text-lightText dark:text-gray-300 leading-relaxed">
        {insight}
      </p>

      {/* CONFIDENCE */}
      <p className={`text-xs mt-3 ${colorClass}`}>
        Confidence: {confidence}
      </p>
    </div>
  );
}
