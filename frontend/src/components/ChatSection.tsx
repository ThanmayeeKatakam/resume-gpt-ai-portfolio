import Chat from "./Chat";

const ChatSection = () => {
  return (
    <section id="chat" className="py-28 px-6 bg-indigo-50">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-indigo-700">
          AI Resume Assistant
        </h2>
        <p className="text-slate-600 mt-4">
          Ask me anything about my experience, skills, or projects.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 border border-slate-200">
        <Chat />
      </div>
    </section>
  );
};

export default ChatSection;