import { ChatContainer } from "./components/ChatContainer";
import { persona } from "./data/persona";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center overflow-hidden">
      <ChatContainer persona={persona} />
    </div>
  );
}

export default App;
