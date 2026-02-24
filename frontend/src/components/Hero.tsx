const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            KATAKAM{" "}
            <span className="text-indigo-600">
              KAMAKSHI THANMAYEE
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
            BTech Computer Science Student passionate about Machine Learning,
            AI systems, and full-stack development.
          </p>

          <div className="mt-6 text-slate-600">
            <p>📞 +91 6305537344</p>
            <p>✉️ kamakshithanmayee@gmail.com</p>
          </div>

          <button
            onClick={() => document.getElementById("chat")?.scrollIntoView()}
            className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            Ask My AI Resume
          </button>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="w-80 h-80 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 font-semibold">
            CGPA: 9.3
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;