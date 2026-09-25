import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white min-h-[85vh] flex items-center">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-8 items-center">

        <div>

          <h1 className="text-6xl font-bold leading-tight">
            Learn.
            <br />
            Teach.
            <br />
            Grow Together.
          </h1>

          <p className="mt-6 text-xl text-slate-300">
            Join SkillXchange and connect learners with mentors.
            Share knowledge, build skills, and earn certificates.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/skills"
              className="bg-blue-600 px-6 py-3 rounded-xl text-lg hover:bg-blue-700"
            >
              Explore Skills
            </Link>

            <Link
              to="/register"
              className="border border-white px-6 py-3 rounded-xl text-lg hover:bg-white hover:text-black"
            >
              Become Mentor
            </Link>

          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">

            <div>
              <h2 className="text-3xl font-bold text-blue-400">500+</h2>
              <p>Learners</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400">100+</h2>
              <p>Mentors</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-400">50+</h2>
              <p>Skills</p>
            </div>

          </div>

        </div>

        <div className="flex justify-center">

          <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700">

            <div className="flex items-center gap-4 mb-8">
              <FaUserGraduate className="text-6xl text-blue-400" />
              <h2 className="text-3xl font-bold">
                Learner
              </h2>
            </div>

            <div className="text-center text-5xl mb-8">
              ↕
            </div>

            <div className="flex items-center gap-4">
              <FaChalkboardTeacher className="text-6xl text-green-400" />
              <h2 className="text-3xl font-bold">
                Mentor
              </h2>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;