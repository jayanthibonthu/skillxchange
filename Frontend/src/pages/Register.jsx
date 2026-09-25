import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaUserPlus } from "react-icons/fa";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
        <div className="bg-gray-800 border border-blue-500 p-8 rounded-3xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <FaUserPlus className="text-5xl text-blue-400 mx-auto mb-3" />

            <h1 className="text-4xl font-bold text-white">Register</h1>

            <p className="text-gray-400 mt-2">
              Join SkillXchange and start learning today.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 mb-4 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 mb-4 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 mb-4 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />

            {/* Role Selection */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 mb-6 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="learner">Learner</option>
              <option value="mentor">Mentor</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;