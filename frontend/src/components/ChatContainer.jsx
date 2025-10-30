import { useState } from "react";
import { PersonaHeader } from "./PersonaHeader";
import { MessageList } from "./MessageList";
import { InputBar } from "./InputBar";
import { botReply } from "../utils/botReply";

export function ChatContainer({ persona }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: `Привет! Я ${persona.name}. Хочешь послушать что-то новое? 🎵` },
  ]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };
    const reply = { role: "bot", text: botReply(text, persona) };

    setMessages((prev) => [...prev, userMessage, reply]);
  };

  return (
    <div
      className="flex flex-col h-screen max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden"
      style={{ backgroundColor: persona.theme.background }}
    >
      <PersonaHeader
        avatar={persona.avatar}
        name={persona.name}
        description={persona.description}
        theme={persona.theme}
      />
      <MessageList messages={messages} persona={persona} />
      <InputBar onSend={handleSendMessage} />
    </div>
  );
}
