import { Link } from "react-router-dom";
import {
  FaStar,
  FaCode,
  FaPaintBrush,
  FaCamera,
  FaMusic,
} from "react-icons/fa";

function Mentors() {
  const mentors = [
    {
      name: "Rahul Sharma",
      skill: "Web Development",
      rating: "4.9",
      students: "120+",
      icon: <FaCode />,
    },
    {
      name: "Priya Reddy",
      skill: "Graphic Design",
      rating: "4.8",
      students: "95+",
      icon: <FaPaintBrush />,
    },
    {
      name: "Arjun Kumar",
      skill: "Photography",
      rating: "4.7",
      students: "80+",
      icon: <FaCamera />,
    },
    {
      name: "Sneha Patel",
      skill: "Music",
      rating: "4.9",
      students: "150+",
      icon: <FaMusic />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-8">
      <h1 className="text-5xl font-bold text-center mb-4">
        Meet Our Mentors
      </h1>

      <p className="text-center text-slate-400 mb-12 text-lg">
        Learn from experienced professionals and grow your skills faster.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-4xl mb-6">
              {mentor.icon}
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              {mentor.name}
            </h2>

            <p className="text-blue-400 mb-4">
              {mentor.skill}
            </p>

            <div className="flex items-center gap-2 mb-2">
              <FaStar className="text-yellow-400" />
              <span>{mentor.rating}</span>
            </div>

            <p className="text-slate-400 mb-6">
              {mentor.students} Students Mentored
            </p>

            <Link
              to="/request"
              className="block text-center bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
            >
              Book Session
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mentors;