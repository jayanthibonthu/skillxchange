import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RequestForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const skillData = location.state || {};

  const skill = skillData.skill || "";
  const receiver = skillData.mentorId || "";
  const mentorName = skillData.mentorName || "Mentor";

  const [time, setTime] = useState("Morning");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check skill
    if (!skill) {
      setMessage("Skill information is missing. Please select the skill again.");
      return;
    }

    // Check mentor
    if (!receiver) {
      setMessage(
        "Mentor information is missing. Please select the skill again."
      );
      return;
    }

    // Check reason
    if (!reason.trim()) {
      setMessage("Please enter your reason for learning.");
      return;
    }

    try {
      setLoading(true);

      // Get logged-in user
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setMessage("Please login first.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user.id) {
        setMessage("User information is missing. Please login again.");
        return;
      }

      // Send request to backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/requests/send`,
        {
          sender: user.id,
          receiver: receiver,
          skill: skill,
          time: time,
          reason: reason.trim()
        }
      );

      if (response.data.success) {
        setMessage("Learning Request Sent Successfully!");

        setTimeout(() => {
          navigate("/learner-dashboard");
        }, 1000);
      }

    } catch (error) {
      console.error("Request Error:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to send learning request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Learning Request
        </h1>

        {/* Skill */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Skill
          </label>

          <input
            type="text"
            value={skill}
            readOnly
            className="w-full border p-3 rounded bg-gray-100"
          />
        </div>

        {/* Mentor */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Mentor
          </label>

          <input
            type="text"
            value={mentorName}
            readOnly
            className="w-full border p-3 rounded bg-gray-100"
          />
        </div>

        {/* Preferred Time */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Preferred Time
          </label>

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Reason for Learning
          </label>

          <textarea
            placeholder="Why do you want to learn this skill?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-3 rounded h-32 resize-none"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-center mb-4 font-medium">
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>

      </div>
    </div>
  );
}

export default RequestForm;