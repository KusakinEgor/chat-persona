import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InputBar({ onSend }) {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(value.length > 0);
  }, [value]);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="relative flex items-center p-4 bg-white/40 backdrop-blur-xl border-t border-orange-200/20">
      {/* Glow фон вокруг инпута */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(251,146,60,0.15), transparent 70%), radial-gradient(circle at 20% 80%, rgba(251,146,60,0.1), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center w-full bg-white/50 rounded-3xl px-4 py-3 shadow-inner hover:shadow-2xl focus-within:ring-4 focus-within:ring-orange-300 transition-all"
      >
        <motion.div className="flex-1 relative">
          <motion.input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Напиши сообщение..."
            className="flex-1 bg-transparent text-gray-900 placeholder-transparent focus:outline-none text-sm md:text-base"
          />
          <motion.label
            animate={{
              y: value ? -20 : 0,
              scale: value ? 0.85 : 1,
              color: value ? "#fb923c" : "#f97316",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-0 top-1 text-orange-300 pointer-events-none select-none"
          >
            Напиши сообщение...
          </motion.label>
        </motion.div>

        <AnimatePresence>
          <motion.button
            key={isTyping ? "active" : "idle"}
            onClick={handleSend}
            whileHover={{ scale: 1.2, boxShadow: "0 0 30px rgba(251,146,60,0.6)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: isTyping ? [-2, 2, -2] : 0,
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 1.2,
              repeat: isTyping ? Infinity : 0,
              repeatType: "mirror",
            }}
            className="ml-3 p-3 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 text-white shadow-xl hover:shadow-2xl bg-[length:200%_200%] transition-all"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
