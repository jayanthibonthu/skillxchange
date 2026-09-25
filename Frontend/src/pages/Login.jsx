import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaSignInAlt } from "react-icons/fa";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const data = await loginUser(formData);

      console.log("========== LOGIN RESPONSE ==========");
      console.log(JSON.stringify(data, null, 2));      console.log("Token:", data.token);
      console.log("User:", data.user);
      console.log("Role:", data.user.role);

      alert(data.message);

      if (data.user.role === "mentor") {
        console.log("Navigating to Mentor Dashboard...");
        navigate("/mentor-dashboard", { replace: true });
      } else {
        console.log("Navigating to Learner Dashboard...");
        navigate("/learner-dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Login Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
        <div className="bg-gray-800 border border-blue-500 p-8 rounded-3xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <FaSignInAlt className="text-5xl text-blue-400 mx-auto mb-3" />

            <h1 className="text-4xl font-bold text-white">
              Login
            </h1>

            <p className="text-gray-400 mt-2">
              Welcome back to SkillXchange.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 mb-4 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 mb-6 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;