export function MessageBubble({ role, text, theme }) {
  const isUser = role === "user";
  return (
    <div
      className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${
        isUser ? "self-end text-white" : "self-start text-gray-800"
      }`}
      style={{
        backgroundColor: isUser ? "#3b82f6" : theme.primary,
        borderTopRightRadius: isUser ? "0.25rem" : "1rem",
        borderTopLeftRadius: isUser ? "1rem" : "0.25rem",
      }}
    >
      {text}
    </div>
  );
}
