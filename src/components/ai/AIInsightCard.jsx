export default function AIInsightCard({ title, insight, confidence }) {
  const color =
    confidence === "High"
      ? "text-green-400"
      : confidence === "Medium"
      ? "text-yellow-400"
      : "text-gray-400";

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-glass">
      <p className="text-xs text-gray-400 mb-1">🤖 AI INSIGHT</p>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{insight}</p>

      <p className={`text-xs mt-3 ${color}`}>
        Confidence: {confidence}
      </p>
    </div>
  );
}
