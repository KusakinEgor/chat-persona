import { ChatContainer } from "./components/ChatContainer";
import { persona } from "./data/persona";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Основной компонент чата */}
      <ChatContainer persona={persona} />
    </div>
  );
}

export default App;
