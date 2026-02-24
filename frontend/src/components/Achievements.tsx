const achievements = [
  "🏆 1st Prize – Project Expo",
  "🏆 1st Prize – Brevity Blitz",
  "🥈 2nd Prize – Technovate",
  "🚀 Shortlisted – HackXerve Hackathon"
];

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="py-28 px-6 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">
          Achievements
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((item) => (
            <div
              key={item}
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-blue-100 shadow-sm hover:shadow-xl transition duration-300"
            >
              <p className="text-lg text-slate-700 font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;