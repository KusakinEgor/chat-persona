import { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import PersonaHeader from "./PersonaHeader";
import { InputBar } from "./InputBar";
import { botReply } from "../utils/botReply";
import { motion } from "framer-motion";

export function ChatContainer({ persona }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `Привет! Я ${persona.name}. Хочешь послушать что-то новое? 🎵`,
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };
    const reply = { role: "bot", text: botReply(text, persona) };

    setMessages((prev) => [...prev, userMessage, reply]);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-orange-50 via-white to-orange-100 overflow-hidden">
      <div className="flex flex-col w-full max-w-[1400px] h-full rounded-3xl shadow-2xl overflow-hidden relative bg-white/80 backdrop-blur-md border border-orange-200">
        {/* Header */}
        <div className="sticky top-0 z-20 border-b border-orange-200 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <FaRobot size={28} color="#fb923c" />
            <PersonaHeader
              avatar={persona.avatar}
              name={persona.name}
              description={persona.description}
              theme={persona.theme}
            />
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#fb923c #ffe5d6",
          }}
        >
          {/* Кастомный скролл для webkit */}
          <style>
            {`
              .custom-scroll::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: #ffe5d6;
                border-radius: 4px;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background: #fb923c;
                border-radius: 4px;
              }
              .custom-scroll::-webkit-scrollbar-thumb:hover {
                background: #f97316;
              }
            `}
          </style>

          <div className="custom-scroll">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`max-w-[70%] p-4 rounded-2xl break-words shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-orange-400 to-orange-300 text-white self-end rounded-br-none"
                    : "bg-gradient-to-r from-white to-orange-50 text-orange-800 self-start rounded-bl-none"
                }`}
              >
                <div className="flex items-center gap-2">
                  {msg.role === "bot" ? (
                    <FaRobot className="text-orange-400" />
                  ) : (
                    <FaUser className="text-white/90" />
                  )}
                  <span>{msg.text}</span>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 z-20 border-t border-orange-200 bg-white/90 backdrop-blur-md px-6 py-4">
          <InputBar onSend={handleSendMessage} />
        </div>

        {/* Glow / фон */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background:
              "radial-gradient(ellipse at bottom right, #fb923c40, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
