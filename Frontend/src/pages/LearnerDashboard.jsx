import { useEffect, useState } from "react";

import {
  FaBook,
  FaCertificate,
  FaUserFriends,
  FaClock,
  FaSearch,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaSignOutAlt,
  FaBell,
  FaComments,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function LearnerDashboard() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // =========================
  // NOTIFICATION STATE
  // =========================

  const [unreadMessages, setUnreadMessages] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // GET LEARNER REQUESTS
  // =========================

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (!user?.id) {
          console.log("Learner ID not found");
          setLoadingRequests(false);
          return;
        }

        console.log("Learner ID:", user.id);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/requests/learner/${user.id}`
        );

        console.log(
          "Learner Requests:",
          response.data
        );

        setRequests(
          response.data.requests || []
        );
      } catch (error) {
        console.error(
          "Fetch Learner Requests Error:",
          error.response?.data ||
            error.message
        );
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, []);

  // =========================
  // CHECK NEW MESSAGES
  // =========================

  useEffect(() => {
    if (!user?.id) return;

    checkNewMessages();

    const interval = setInterval(() => {
      checkNewMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [requests]);

  const checkNewMessages = async () => {
    try {
      const acceptedRequests =
        requests.filter(
          (request) =>
            request.status?.toLowerCase() ===
            "accepted"
        );

      let totalUnread = 0;

      for (const request of acceptedRequests) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/messages/${request.id}`
          );

          const messages =
            response.data.messages || [];

          if (messages.length === 0) {
            continue;
          }

          const lastMessage =
            messages[messages.length - 1];

          const storageKey =
            `lastSeenMessage_${request.id}`;

          const lastSeen =
            localStorage.getItem(storageKey);

          // First time checking this conversation
          if (!lastSeen) {
            localStorage.setItem(
              storageKey,
              lastMessage.id
            );

            continue;
          }

          const lastSeenIndex =
            messages.findIndex(
              (msg) =>
                String(msg.id) ===
                String(lastSeen)
            );

          let newMessages = [];

          if (lastSeenIndex !== -1) {
            newMessages =
              messages.slice(
                lastSeenIndex + 1
              );
          }

          // Only count messages sent by mentor
          const incomingMessages =
            newMessages.filter(
              (msg) =>
                String(msg.sender) !==
                String(user.id)
            );

          totalUnread +=
            incomingMessages.length;
        } catch (error) {
          console.error(
            `Message check failed for request ${request.id}:`,
            error
          );
        }
      }

      setUnreadMessages(totalUnread);
    } catch (error) {
      console.error(
        "Notification Check Error:",
        error
      );
    }
  };

  // =========================
  // OPEN CHAT
  // =========================

  const openChat = async (request) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages/${request.id}`
      );

      const messages =
        response.data.messages || [];

      if (messages.length > 0) {
        const lastMessage =
          messages[messages.length - 1];

        localStorage.setItem(
          `lastSeenMessage_${request.id}`,
          lastMessage.id
        );
      }

      setUnreadMessages(0);
    } catch (error) {
      console.error(
        "Open Chat Error:",
        error
      );
    }

    navigate("/chat", {
      state: {
        request: request,
      },
    });
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // STATS
  // =========================

  const stats = [
    {
      title: "Skills Enrolled",
      value: "12",
      icon: <FaBook />,
    },

    {
      title: "Certificates",
      value: "5",
      icon: <FaCertificate />,
    },

    {
      title: "Mentors Connected",
      value: "8",
      icon: <FaUserFriends />,
    },

    {
      title: "Learning Hours",
      value: "120+",
      icon: <FaClock />,
    },
  ];

  // =========================
  // OPEN NOTIFICATIONS
  // =========================

  const openNotifications = () => {
    const acceptedRequest =
      requests.find(
        (request) =>
          request.status?.toLowerCase() ===
          "accepted"
      );

    if (acceptedRequest) {
      openChat(acceptedRequest);
    } else {
      alert("No new messages");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold mb-2">
            Learner Dashboard
          </h1>

          <p className="text-slate-400">
            Welcome back! Continue your learning journey.
          </p>
        </div>

        {/* =========================
            NOTIFICATION BUTTON
        ========================= */}

        <button
          onClick={openNotifications}
          className="relative flex items-center gap-3 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-5 py-3 rounded-xl transition duration-300 font-semibold"
        >
          <FaBell className="text-xl" />

          <span>
            Notifications
          </span>

          {unreadMessages > 0 && (
            <span
              className="absolute -top-2 -right-2 min-w-[26px] h-[26px] px-2 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-slate-950"
            >
              {unreadMessages > 99
                ? "99+"
                : unreadMessages}
            </span>
          )}
        </button>
      </div>

      {/* =========================
          NOTIFICATION MESSAGE
      ========================= */}

      {unreadMessages > 0 && (
        <div
          className="bg-blue-500/10 border border-blue-500/40 rounded-xl p-4 mb-8 flex items-center gap-3"
        >
          <FaBell className="text-blue-400 text-xl" />

          <p className="text-blue-300">
            You have{" "}

            <span className="font-bold text-white">
              {unreadMessages}
            </span>{" "}

            new message
            {unreadMessages !== 1
              ? "s"
              : ""}.
          </p>
        </div>
      )}

      {/* =========================
          ACTION BUTTONS
      ========================= */}

      <div className="flex flex-wrap gap-4 mb-10">

        <Link
          to="/skills"
          className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl transition duration-300 font-semibold"
        >
          <FaSearch />

          Explore Skills
        </Link>

        <Link
          to="/mentors"
          className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl transition duration-300 font-semibold"
        >
          <FaChalkboardTeacher />

          Find Mentors
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl transition duration-300 font-semibold"
        >
          <FaGraduationCap />

          My Profile
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl transition duration-300 font-semibold"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition duration-300"
          >
            <div className="text-4xl text-blue-500 mb-4">
              {item.icon}
            </div>

            <h3 className="text-slate-400">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        ))}

      </div>

      {/* =========================
          MY LEARNING REQUESTS
      ========================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          My Learning Requests
        </h2>

        {loadingRequests && (
          <p className="text-slate-400">
            Loading requests...
          </p>
        )}

        {!loadingRequests &&
          requests.length === 0 && (
            <p className="text-slate-400">
              You haven't sent any learning requests yet.
            </p>
          )}

        {!loadingRequests &&
          requests.length > 0 && (
            <div className="space-y-4">

              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >

                  {/* REQUEST INFORMATION */}

                  <div>
                    <h3 className="text-xl font-bold text-blue-400">
                      {request.skill}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Mentor:{" "}

                      <span className="text-white font-semibold">
                        {request.mentorName ||
                          "Unknown Mentor"}
                      </span>
                    </p>
                  </div>

                  {/* STATUS + CHAT */}

                  <div className="flex items-center gap-3 flex-wrap">

                    <div
                      className={`px-5 py-2 rounded-lg font-semibold text-center ${
                        request.status
                          ?.toLowerCase() ===
                        "accepted"
                          ? "bg-green-500/20 text-green-400 border border-green-500"
                          : request.status
                              ?.toLowerCase() ===
                            "rejected"
                          ? "bg-red-500/20 text-red-400 border border-red-500"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                      }`}
                    >
                      {request.status ||
                        "Pending"}
                    </div>

                    {/* CHAT */}

                    {request.status
                      ?.toLowerCase() ===
                      "accepted" && (
                      <button
                        onClick={() =>
                          openChat(request)
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition duration-300"
                      >
                        <FaComments />

                        Chat
                      </button>
                    )}

                  </div>
                </div>
              ))}

            </div>
          )}

      </div>

      {/* =========================
          RECENT ACTIVITY
      ========================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-4 text-slate-300">

          <li>
            ✅ Completed Python Basics Course
          </li>

          <li>
            🏆 Earned Web Development Certificate
          </li>

          <li>
            👨‍🏫 Connected with Mentor Rahul Sharma
          </li>

          <li>
            📚 Started Graphic Design Learning Path
          </li>

        </ul>

      </div>

    </div>
  );
}

export default LearnerDashboard;