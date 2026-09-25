
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addSkill } from "../services/skillService";

function AddSkill() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    level: "Beginner",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check login
    if (!user || !user.id) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const skillData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        level: formData.level,
        duration: formData.duration,

        // Logged-in mentor details
        mentorId: user.id,
        mentorName: user.name || "Unknown Mentor",
      };

      console.log("Skill Data:", skillData);

      const data = await addSkill(skillData);

      if (data.success) {
        alert("Skill Added Successfully!");
        navigate("/skills");
      } else {
        alert(data.message || "Failed to Add Skill");
      }

    } catch (error) {
      console.error("Add Skill Error:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Failed to Add Skill"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">

        <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-xl border border-slate-700">

          <h1 className="text-3xl text-white font-bold mb-6 text-center">
            Add New Skill
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Skill Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
              rows="4"
              required
            />

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <input
              type="text"
              name="duration"
              placeholder="Duration (Eg: 30 Days)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
            >
              Add Skill
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default AddSkill;
