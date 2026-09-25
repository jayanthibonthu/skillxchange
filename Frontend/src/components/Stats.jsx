import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLightbulb,
  FaCertificate,
} from "react-icons/fa";

function Stats() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Our Community
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">

        <div className="p-6 shadow-lg rounded-xl hover:scale-105 transition">
          <FaUserGraduate className="text-5xl mx-auto mb-4 text-blue-600" />
          <h3 className="text-3xl font-bold">500+</h3>
          <p>Learners</p>
        </div>

        <div className="p-6 shadow-lg rounded-xl hover:scale-105 transition">
          <FaChalkboardTeacher className="text-5xl mx-auto mb-4 text-green-600" />
          <h3 className="text-3xl font-bold">100+</h3>
          <p>Mentors</p>
        </div>

        <div className="p-6 shadow-lg rounded-xl hover:scale-105 transition">
          <FaLightbulb className="text-5xl mx-auto mb-4 text-yellow-500" />
          <h3 className="text-3xl font-bold">50+</h3>
          <p>Skills</p>
        </div>

        <div className="p-6 shadow-lg rounded-xl hover:scale-105 transition">
          <FaCertificate className="text-5xl mx-auto mb-4 text-purple-600" />
          <h3 className="text-3xl font-bold">1000+</h3>
          <p>Certificates</p>
        </div>

      </div>
    </section>
  );
}

export default Stats;