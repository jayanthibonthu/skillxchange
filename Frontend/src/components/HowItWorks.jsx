import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      title: "Register",
      description: "Create your account as a learner or mentor.",
      link: "/register",
      icon: "📝",
    },
    {
      title: "Find Skills",
      description: "Browse available skills and mentors.",
      link: "/skills",
      icon: "🔍",
    },
    {
      title: "Connect with Mentors",
      description: "Send requests and start learning.",
      link: "/mentors",
      icon: "🤝",
    },
    {
      title: "Earn Certificates",
      description: "Complete skills and receive certificates.",
      link: "/certificate",
      icon: "🏆",
    },
  ];

  return (
    <section className="py-20 px-8 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold text-center mb-4">
        How It Works
      </h2>

      <p className="text-center text-gray-400 mb-12">
        Follow these simple steps to start your learning journey.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Link key={index} to={step.link}>
            <div className="bg-gray-800 border border-blue-500 rounded-2xl p-8 text-center shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition duration-300 cursor-pointer h-full">

              <div className="text-6xl mb-4">
                {step.icon}
              </div>

              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold text-blue-400 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-300">
                {step.description}
              </p>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;