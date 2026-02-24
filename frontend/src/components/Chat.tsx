import { useState, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);

  // Create session when component loads
  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/session", {
          method: "POST"
        });
        const data = await response.json();
        setSessionId(data.session_id);
      } catch (error) {
        console.error("Failed to create session");
      }
    };

    createSession();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage = input;

    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage
        })
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [
          ...prev,
          { role: "ai", content: "⚠️ " + data.error }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: "ai", content: data.response }
        ]);
      }

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "ai", content: "⚠️ Server not responding." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      <div className="h-[500px] overflow-y-auto bg-slate-900 rounded-2xl p-6 space-y-4 shadow-inner border border-slate-700">

        {messages.length === 0 && (
          <div className="text-slate-400 text-center mt-10">
            Ask anything about my internship, projects, skills, or achievements.
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-xl text-sm md:text-base leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-slate-700 text-white rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-slate-400 text-sm">
            AI is typing...
          </div>
        )}

      </div>

      <div className="mt-6 flex gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Chat;