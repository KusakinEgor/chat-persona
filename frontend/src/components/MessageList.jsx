import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages, persona }) {
  return (
    <div className="flex flex-col space-y-3 p-4 overflow-y-auto max-h-[calc(100vh-150px)]">
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <MessageBubble
              role={msg.role}
              text={msg.text}
              theme={persona.theme}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
