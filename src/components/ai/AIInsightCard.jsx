export default function AIInsightCard({ title, insight, confidence }) {
  const color =
    confidence === "High"
      ? "text-green-600 dark:text-green-400"
      : confidence === "Medium"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-lightMuted dark:text-gray-400";

  return (
    <div
      className="
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-5
      "
    >
      <p className="text-xs text-lightMuted dark:text-gray-400 mb-1">
        🤖 AI INSIGHT
      </p>

      <h3 className="font-semibold mb-2">{title}</h3>

      <p className="text-sm text-lightText dark:text-gray-300">
        {insight}
      </p>

      <p className={`text-xs mt-3 ${color}`}>
        Confidence: {confidence}
      </p>
    </div>
  );
}
