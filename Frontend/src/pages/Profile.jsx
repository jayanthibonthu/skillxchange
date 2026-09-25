import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaCertificate,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

function Profile() {
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [course, setCourse] = useState("");

  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD USER DATA
  // =========================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    setStoredUser(user);
    setName(user.name || "Your Name");
    setEmail(user.email || "your@email.com");
    setSkills(user.skills || "Python, React, JavaScript");
    setCourse(user.course || "Computer Science Student");
  }, []);

  // =========================
  // EDIT
  // =========================
  const handleEdit = () => {
    setIsEditing(true);
  };

  // =========================
  // CANCEL
  // =========================
  const handleCancel = () => {
    setName(storedUser.name || "Your Name");
    setEmail(storedUser.email || "your@email.com");
    setSkills(
      storedUser.skills || "Python, React, JavaScript"
    );
    setCourse(
      storedUser.course || "Computer Science Student"
    );

    setIsEditing(false);
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Name and email are required");
      return;
    }

    try {
      setSaving(true);

      // =========================
      // UPDATE BACKEND
      // =========================
      if (storedUser.id) {
        const response = await axios.put(
          `http://localhost:5000/api/auth/profile/${storedUser.id}`,
          {
            name,
            email,
            skills,
            course,
          }
        );

        console.log(
          "Profile Update Response:",
          response.data
        );
      }

      // =========================
      // UPDATE LOCAL STORAGE
      // =========================
      const updatedUser = {
        ...storedUser,
        name,
        email,
        skills,
        course,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setStoredUser(updatedUser);
      setIsEditing(false);

      alert("Profile updated successfully!");

    } catch (error) {
      console.error(
        "Profile Update Error:",
        error.response?.data || error.message
      );

      // =========================
      // EVEN IF BACKEND FAILS,
      // SAVE LOCALLY
      // =========================
      const updatedUser = {
        ...storedUser,
        name,
        email,
        skills,
        course,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setStoredUser(updatedUser);
      setIsEditing(false);

      alert(
        "Profile saved locally. Backend update failed."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10">

        {/* =========================
            PROFILE HEADER
        ========================= */}

        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* PROFILE ICON */}

          <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-6xl">
            <FaUser />
          </div>

          {/* NAME + COURSE */}

          <div className="flex-1 w-full">

            {isEditing ? (

              <div className="space-y-3">

                {/* NAME */}

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500"
                />

                {/* COURSE */}

                <input
                  type="text"
                  value={course}
                  onChange={(e) =>
                    setCourse(e.target.value)
                  }
                  placeholder="Enter your course"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500"
                />

              </div>

            ) : (

              <>
                <h1 className="text-4xl font-bold">
                  {name}
                </h1>

                <p className="text-slate-400 mt-2">
                  {course}
                </p>
              </>

            )}

            {/* =========================
                BUTTONS
            ========================= */}

            {!isEditing ? (

              <button
                onClick={handleEdit}
                className="mt-4 flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                <FaEdit />
                Edit Profile
              </button>

            ) : (

              <div className="flex gap-3 mt-4">

                {/* SAVE */}

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-green-600 px-5 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                >
                  <FaSave />

                  {saving ? "Saving..." : "Save"}
                </button>

                {/* CANCEL */}

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-2 bg-slate-700 px-5 py-2 rounded-xl hover:bg-slate-600 transition"
                >
                  <FaTimes />
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>


        {/* =========================
            PROFILE DETAILS
        ========================= */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {/* =========================
              EMAIL
          ========================= */}

          <div className="bg-slate-800 rounded-2xl p-6">

            <FaEnvelope className="text-blue-500 text-3xl mb-3" />

            <h3 className="font-semibold">
              Email
            </h3>

            {isEditing ? (

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-blue-500"
              />

            ) : (

              <p className="text-slate-400 mt-1">
                {email}
              </p>

            )}

          </div>


          {/* =========================
              SKILLS
          ========================= */}

          <div className="bg-slate-800 rounded-2xl p-6">

            <FaGraduationCap className="text-blue-500 text-3xl mb-3" />

            <h3 className="font-semibold">
              Skills
            </h3>

            {isEditing ? (

              <input
                type="text"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                placeholder="Python, React, JavaScript"
                className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-blue-500"
              />

            ) : (

              <p className="text-slate-400 mt-1">
                {skills}
              </p>

            )}

          </div>


          {/* =========================
              CERTIFICATES
          ========================= */}

          <div className="bg-slate-800 rounded-2xl p-6">

            <FaCertificate className="text-blue-500 text-3xl mb-3" />

            <h3 className="font-semibold">
              Certificates
            </h3>

            <p className="text-slate-400">
              5 Completed
            </p>

          </div>


          {/* =========================
              ROLE
          ========================= */}

          <div className="bg-slate-800 rounded-2xl p-6">

            <FaUser className="text-blue-500 text-3xl mb-3" />

            <h3 className="font-semibold">
              Role
            </h3>

            <p className="text-slate-400">
              {storedUser.role || "Learner"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;