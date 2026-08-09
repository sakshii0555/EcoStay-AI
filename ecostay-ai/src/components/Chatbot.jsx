import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 🌿 I'm EcoStay AI. How can I help you plan your journey?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://ecostay-ai-3io2.onrender.com/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, I couldn't process that. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">

          {/* HEADER */}
          <div className="bg-green-600 text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">
                🌿 EcoStay AI
              </h3>

              <p className="text-sm text-green-100">
                Your travel assistant
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl hover:text-gray-200"
            >
              ×
            </button>
          </div>

          {/* MESSAGES */}
          <div className="h-[350px] overflow-y-auto p-4 bg-gray-50 space-y-3">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-white text-gray-700 shadow-sm border rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm text-gray-500 text-sm">
                  EcoStay AI is thinking... 🌿
                </div>
              </div>
            )}

          </div>

          {/* INPUT */}
          <div className="p-3 bg-white border-t flex gap-2">

            <input
              type="text"
              placeholder="Ask EcoStay AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 rounded-xl font-semibold"
            >
              ➤
            </button>

          </div>
        </div>
      )}

      {/* FLOATING CHATBOT ICON */}
      <div className="fixed bottom-6 right-6 z-50">

        {/* AI BADGE */}
        <div className="absolute -top-2 -right-2 bg-white text-green-700 text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
          AI
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-[0_0_25px_rgba(34,197,94,0.55)] flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110"
          aria-label="Open EcoStay AI chatbot"
        >
          💬
        </button>

      </div>
    </>
  );
}

export default Chatbot;