import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages, persona }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <MessageBubble role={msg.role} text={msg.text} theme={persona.theme} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
