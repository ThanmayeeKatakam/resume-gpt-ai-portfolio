import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ChatSection from "./components/ChatSection";
import Navbar from "./components/Navbar";
import Achievements from "./components/Achievements";

function App() {
  return (
    <div className="bg-slate-50 text-slate-800">
      <Navbar />

      {/* Prevent content hiding behind fixed navbar */}
      <div className="pt-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <ChatSection />
      </div>
    </div>
  );
}

export default App;