import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / Name */}
        <h1 className="text-lg font-bold text-indigo-600">
          Kamakshi Thanmayee
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-slate-700 font-medium">
          <button onClick={() => scrollTo("about")} className="hover:text-indigo-600 transition">
            About
          </button>
          <button onClick={() => scrollTo("skills")} className="hover:text-indigo-600 transition">
            Skills
          </button>
          <button onClick={() => scrollTo("projects")} className="hover:text-indigo-600 transition">
            Projects
          </button>
          <button onClick={() => scrollTo("chat")} className="hover:text-indigo-600 transition">
            AI Chat
          </button>

          {/* External Links */}
          <a
            href="https://www.linkedin.com/in/kamakshithanmayee/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/ThanmayeeKatakam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-4 text-slate-700 font-medium">
          <button onClick={() => scrollTo("about")} className="block">
            About
          </button>
          <button onClick={() => scrollTo("skills")} className="block">
            Skills
          </button>
          <button onClick={() => scrollTo("projects")} className="block">
            Projects
          </button>
          <button onClick={() => scrollTo("chat")} className="block">
            AI Chat
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;