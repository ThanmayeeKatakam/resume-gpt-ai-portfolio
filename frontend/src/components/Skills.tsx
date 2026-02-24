const skills = [
  "Java",
  "Python",
  "C",
  "Data Structures",
  "OOP",
  "DBMS",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "React",
  "TypeScript",
  "MySQL",
  "VS Code",
  "Jupyter",
  "Eclipse"
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 px-6 bg-slate-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Technical Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 font-medium hover:shadow-md transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;