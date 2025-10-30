import { useState } from "react";

export function InputBar({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-white">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Напиши сообщение..."
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        ➤
      </button>
    </div>
  );
}
