import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

function Chat() {
  const location = useLocation();
  const navigate = useNavigate();

  const request = location.state?.request;
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // =========================
  // CHECK REQUEST
  // =========================
  useEffect(() => {
    if (!request) {
      navigate(
        user?.role === "mentor"
          ? "/mentor-dashboard"
          : "/learner-dashboard"
      );
      return;
    }

    if (request.status?.toLowerCase() !== "accepted") {
      navigate(
        user?.role === "mentor"
          ? "/mentor-dashboard"
          : "/learner-dashboard"
      );
      return;
    }

    fetchMessages();

    // Check for new messages every 3 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    // Stop checking when leaving the chat
    return () => clearInterval(interval);
  }, []);

  // =========================
  // GET MESSAGES
  // =========================
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages/${request.id}`
      );

      setMessages(response.data.messages || []);
    } catch (error) {
      console.error(
        "Fetch Messages Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      setSending(true);

      // Find the other person
      const receiver =
        String(user.id) === String(request.sender)
          ? request.receiver
          : request.sender;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/messages/send`,
        {
          requestId: request.id,
          sender: user.id,
          receiver: receiver,
          message: newMessage.trim(),
        }
      );

      setMessages((prev) => [
        ...prev,
        response.data.data,
      ]);

      setNewMessage("");
    } catch (error) {
      console.error(
        "Send Message Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to send message"
      );
    } finally {
      setSending(false);
    }
  };

  // =========================
  // BACK TO DASHBOARD
  // =========================
  const goBack = () => {
    navigate(
      user?.role === "mentor"
        ? "/mentor-dashboard"
        : "/learner-dashboard"
    );
  };

  // =========================
  // PERSON NAME
  // =========================
  const otherPerson =
    user?.role === "mentor"
      ? request?.learnerName || "Learner"
      : request?.mentorName || "Mentor";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        {/* CHAT BOX */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-slate-800 p-5 border-b border-slate-700">
            <h1 className="text-2xl font-bold">
              Chat
            </h1>

            <p className="text-slate-400 mt-1">
              Learning:{" "}
              <span className="text-blue-400">
                {request?.skill}
              </span>
            </p>

            <p className="text-slate-400">
              {user?.role === "mentor"
                ? "Learner"
                : "Mentor"}:{" "}

              <span className="text-white font-semibold">
                {otherPerson}
              </span>
            </p>
          </div>

          {/* MESSAGES */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">

            {loading && (
              <p className="text-center text-slate-400">
                Loading messages...
              </p>
            )}

            {!loading && messages.length === 0 && (
              <div className="text-center text-slate-500 mt-20">
                <p className="text-lg">
                  No messages yet.
                </p>

                <p className="text-sm mt-2">
                  Start the conversation!
                </p>
              </div>
            )}

            {messages.map((msg) => {
              const isMine =
                String(msg.sender) === String(user?.id);

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      isMine
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-slate-800 text-slate-200 rounded-bl-sm"
                    }`}
                  >
                    <p>
                      {msg.message}
                    </p>

                    <p className="text-xs opacity-60 mt-1">
                      {msg.created_at
                        ? new Date(
                            msg.created_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MESSAGE INPUT */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-slate-700 flex gap-3"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) =>
                setNewMessage(e.target.value)
              }
              placeholder="Type your message..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 rounded-xl flex items-center gap-2"
            >
              <FaPaperPlane />

              {sending
                ? "Sending..."
                : "Send"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Chat;