export default function ChatBubble({ role, text, insight }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[85%] text-sm px-4 py-3 rounded-2xl ${
        isUser
          ? "ml-auto bg-primary text-white rounded-br-sm"
          : `
            bg-lightCard text-lightText border border-lightBorder
            dark:bg-surface dark:border-border
            rounded-bl-sm
          `
      }`}
    >
      <p>{text}</p>

      {/* AI INSIGHT CARD */}
      {insight && (
        <div
          className="
            mt-4
            bg-lightBg border border-lightBorder
            dark:bg-bg dark:border-border
            rounded-xl p-4 text-xs
          "
        >
          <p className="font-semibold mb-2">
            📊 Project Health Index
          </p>

          <div className="w-full h-2 bg-lightBorder dark:bg-border rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary"
              style={{ width: "84%" }}
            />
          </div>

          <p className="text-lightMuted dark:text-gray-400 mb-3">
            Throughput increased by <strong>12%</strong> this month.
            However, 5 critical tasks are due soon.
          </p>

          <div className="flex gap-2">
            <button
              className="
                px-3 py-1 rounded-lg
                bg-primary/20 text-primary text-xs
              "
            >
              Reassign Tasks
            </button>

            <button
              className="
                px-3 py-1 rounded-lg text-xs
                bg-lightCard border border-lightBorder
                dark:bg-card dark:border-border
              "
            >
              Notify Team
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
