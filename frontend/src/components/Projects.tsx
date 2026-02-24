const projects = [
  {
    title: "GramaSethu",
    description:
      "Web application to preserve cultural heritage by promoting village tourism using HTML, CSS, JavaScript, Flask, MySQL, and Leaflet API."
  },
  {
    title: "Salary Acquittance System",
    description:
      "Role-based payroll system with automated salary calculation, tax handling, analytics dashboard, and chatbot integration."
  },
  {
    title: "ResumeGPT - AI Portfolio",
    description:
      "Web Application to showcase personal portfolio along with AI chat functionality with backend supported by Python"
  },
  {
    title: "CNN Accident Detection",
    description:
      "Built a CNN-based car accident detection model achieving 92% accuracy during internship."
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Internship & Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-4">
                {project.title}
              </h3>
              <p className="text-slate-600 leading-7">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;