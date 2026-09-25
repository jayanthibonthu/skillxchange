import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getSkills } from "../services/skillService";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data.skills || []);
    } catch (error) {
      console.log("Fetch Skills Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (skill) => {
    navigate("/request", {
      state: {
        skill: skill.title,
        mentorId: skill.mentor || skill.mentor_id,
        mentorName:
          skill.mentorName ||
          skill.mentor_name ||
          "Mentor"
      }
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

        <h1 className="text-4xl font-bold text-center mb-3">
          Explore Skills
        </h1>

        <p className="text-slate-400 text-center mb-10">
          Learn new skills from experienced mentors.
        </p>

        {loading ? (
          <h2 className="text-center text-xl">
            Loading Skills...
          </h2>
        ) : skills.length === 0 ? (
          <h2 className="text-center text-xl text-slate-400">
            No Skills Available
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition duration-300"
              >

                <h2 className="text-2xl font-bold text-blue-400 mb-4">
                  {skill.title}
                </h2>

                <p className="mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {skill.category}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Level:</span>{" "}
                  {skill.level}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Duration:</span>{" "}
                  {skill.duration}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Mentor:</span>{" "}
                  {skill.mentorName || skill.mentor_name || "Mentor"}
                </p>

                <p className="text-slate-300 mt-4 mb-6">
                  {skill.description}
                </p>

                <button
                  onClick={() => handleRequest(skill)}
                  className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-semibold transition"
                >
                  Request to Learn
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default Skills;