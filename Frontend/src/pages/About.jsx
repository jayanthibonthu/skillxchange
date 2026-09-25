import Navbar from "../components/Navbar";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCertificate,
} from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 text-white py-16 px-6">

        <h1 className="text-5xl font-bold text-center mb-4">
          🤝 Learn Together
        </h1>

        <p className="text-center text-gray-400 text-lg mb-12">
          Building a community where everyone can learn, teach, and grow.
        </p>

        <div className="max-w-5xl mx-auto bg-gray-800 border border-blue-500 rounded-3xl p-10 shadow-lg">

          <p className="text-lg text-gray-300 mb-6 leading-8">
            SkillXchange is a community-driven platform where learners and
            mentors come together to share knowledge, exchange skills,
            and help each other grow professionally and personally.
          </p>

          <p className="text-lg text-gray-300 mb-6 leading-8">
            Anyone can become a mentor by sharing expertise in programming,
            design, photography, music, cooking, communication, and many
            other skills.
          </p>

          <p className="text-lg text-gray-300 mb-6 leading-8">
            Learners can discover mentors, join learning sessions,
            access resources, complete skill tracks, and earn certificates.
          </p>

          <p className="text-lg text-gray-300 leading-8">
            Our mission is to create a world where learning is accessible,
            collaborative, and driven by community knowledge sharing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">

          <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center hover:scale-105 transition">
            <FaUsers className="text-5xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Community</h3>
            <p className="text-gray-400 mt-2">
              Learn and grow together.
            </p>
          </div>

          <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center hover:scale-105 transition">
            <FaChalkboardTeacher className="text-5xl text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Mentorship</h3>
            <p className="text-gray-400 mt-2">
              Learn directly from experts.
            </p>
          </div>

          <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center hover:scale-105 transition">
            <FaUserGraduate className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Learning</h3>
            <p className="text-gray-400 mt-2">
              Discover new opportunities.
            </p>
          </div>

          <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center hover:scale-105 transition">
            <FaCertificate className="text-5xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Certificates</h3>
            <p className="text-gray-400 mt-2">
              Showcase your achievements.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default About;