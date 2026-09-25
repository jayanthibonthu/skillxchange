import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaCertificate,
  FaUsers,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUserGraduate />,
      title: "Find Expert Mentors",
      description:
        "Connect with experienced mentors and receive personalized guidance.",
      link: "/mentors",
    },
    {
      icon: <FaLaptopCode />,
      title: "Learn In-Demand Skills",
      description:
        "Build practical skills through structured learning and mentorship.",
      link: "/skills",
    },
    {
      icon: <FaCertificate />,
      title: "Verified Certificates",
      description:
        "Earn certificates that showcase your achievements and progress.",
      link: "/certificate",
    },
    {
      icon: <FaUsers />,
      title: "Collaborative Community",
      description:
        "Learn, share knowledge, and grow with a strong learning network.",
      link: "/about",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-bold text-center mb-4">
          Why Choose SkillXchange?
        </h2>

        <p className="text-center text-slate-400 mb-14 text-lg">
          A modern platform for learning, mentoring, and skill development.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl text-blue-500 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-7 mb-6">
                {feature.description}
              </p>

              <Link
                to={feature.link}
                className="inline-block text-blue-400 hover:text-blue-300 font-medium"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;