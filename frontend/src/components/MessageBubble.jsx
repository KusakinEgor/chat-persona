import { motion } from "framer-motion";

export function MessageBubble({ role, text, theme }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`max-w-[75%] px-4 py-3 mb-2 break-words relative ${
        isUser ? "self-end text-white" : "self-start text-gray-900"
      }`}
      style={{
        background: isUser
          ? "linear-gradient(135deg, #fb923c, #f97316)",
        boxShadow: isUser
          ? "0 4px 12px rgba(251,146,60,0.3)"
          : `0 2px 8px rgba(0,0,0,0.08)`,
        borderRadius: "1.5rem",
        borderTopRightRadius: isUser ? "0.4rem" : "1.5rem",
        borderTopLeftRadius: isUser ? "1.5rem" : "0.4rem",
      }}
    >
      {/* Glow для ассистента */}
      {!isUser && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${theme.primary}30, transparent 70%)`,
          }}
        />
      )}
      <p className="text-[15px] leading-relaxed relative z-10">{text}</p>
    </motion.div>
  );
}
