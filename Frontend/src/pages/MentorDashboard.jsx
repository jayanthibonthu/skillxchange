import { useEffect, useState } from "react";

import {
  FaUsers,
  FaBookOpen,
  FaCertificate,
  FaRupeeSign,
  FaPlusCircle,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaComments,
  FaBell,
  FaVideo,
  FaUpload,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import {
  getMentorRequests,
  updateRequestStatus,
} from "../services/requestService";

import {
  getResources,
  uploadMentorVideo,
} from "../services/resourceService";

// Only these file extensions are allowed for mentor video uploads
const ALLOWED_VIDEO_EXTENSIONS = [".mp4", ".mkv"];


function MentorDashboard() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // =========================
  // NOTIFICATION STATE
  // =========================

  const [unreadMessages, setUnreadMessages] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));


  // =========================
  // VIDEO UPLOAD STATE
  // =========================

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [myVideos, setMyVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);


  // =========================
  // GET MENTOR REQUESTS
  // =========================

  useEffect(() => {

    if (user?.id) {

      fetchRequests();

    }

  }, []);


  const fetchRequests = async () => {

    try {

      const data = await getMentorRequests(user.id);

      console.log("Mentor Requests:", data);

      setRequests(data.requests || []);

    } catch (error) {

      console.error(
        "Fetch Mentor Requests Error:",
        error
      );

    } finally {

      setLoadingRequests(false);

    }

  };


  // =========================
  // FETCH MENTOR'S OWN VIDEOS
  // =========================

  useEffect(() => {

    if (user?.id) {

      fetchMyVideos();

    }

  }, []);


  const fetchMyVideos = async () => {

    try {

      const data = await getResources();

      const allResources = data.resources || [];

      // Only this mentor's videos (link points to /uploads/videos/...)
      const videos = allResources.filter(
        (resource) =>
          String(resource.uploadedBy) === String(user.id) &&
          resource.link?.includes("/uploads/videos/")
      );

      setMyVideos(videos);

    } catch (error) {

      console.error("Fetch Mentor Videos Error:", error);

    } finally {

      setLoadingVideos(false);

    }

  };


  // =========================
  // HANDLE VIDEO FILE SELECT
  // =========================

  const handleVideoFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      setVideoFile(null);
      return;
    }

    const fileName = file.name.toLowerCase();

    const isAllowed = ALLOWED_VIDEO_EXTENSIONS.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isAllowed) {
      alert("Only MP4 and MKV video files are allowed.");
      e.target.value = ""; // reset the input
      setVideoFile(null);
      return;
    }

    setVideoFile(file);

  };


  // =========================
  // HANDLE VIDEO UPLOAD
  // =========================

  const handleVideoUpload = async (e) => {

    e.preventDefault();

    if (!user || !user.id) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!videoTitle.trim()) {
      alert("Please enter a title for the video.");
      return;
    }

    if (!videoFile) {
      alert("Please select an MP4 or MKV video file.");
      return;
    }

    setUploadingVideo(true);

    try {

      await uploadMentorVideo({
        title: videoTitle,
        description: videoDescription,
        uploadedBy: user.id,
        videoFile: videoFile,
      });

      alert("Video uploaded successfully!");

      // Reset form
      setVideoTitle("");
      setVideoDescription("");
      setVideoFile(null);
      document.getElementById("mentorVideoInput").value = "";

      fetchMyVideos();

    } catch (error) {

      console.error("Video Upload Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to upload video."
      );

    } finally {

      setUploadingVideo(false);

    }

  };


  // =========================
  // CHECK NEW MESSAGES
  // =========================

  useEffect(() => {

    if (!user?.id) return;


    // First check
    checkNewMessages();


    // Check every 3 seconds
    const interval = setInterval(() => {

      checkNewMessages();

    }, 3000);


    // Stop when leaving dashboard
    return () => clearInterval(interval);

  }, [requests]);


  const checkNewMessages = async () => {

    try {

      // Only check accepted requests
      const acceptedRequests = requests.filter(
        (request) =>
          request.status?.toLowerCase() === "accepted"
      );


      let totalUnread = 0;


      for (const request of acceptedRequests) {

        try {

          const response = await axios.get(
            `http://localhost:5000/api/messages/${request.id}`
          );


          const messages =
            response.data.messages || [];


          if (messages.length === 0) {
            continue;
          }


          // Last message currently available
          const lastMessage =
            messages[messages.length - 1];


          // LocalStorage key for this request
          const storageKey =
            `lastSeenMessage_${request.id}`;


          const lastSeen =
            localStorage.getItem(storageKey);


          // First time opening dashboard
          if (!lastSeen) {

            // Set current latest message as seen
            localStorage.setItem(
              storageKey,
              lastMessage.id
            );

            continue;

          }


          // Find messages after last seen message
          const lastSeenIndex =
            messages.findIndex(
              (msg) =>
                String(msg.id) ===
                String(lastSeen)
            );


          let newMessages = [];


          if (lastSeenIndex !== -1) {

            newMessages =
              messages.slice(lastSeenIndex + 1);

          } else {

            // If old message ID no longer exists,
            // don't notify for all old messages
            newMessages = [];

          }


          // Only count messages received from learner
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

      // Get latest messages
      const response = await axios.get(
        `http://localhost:5000/api/messages/${request.id}`
      );


      const messages =
        response.data.messages || [];


      // Mark latest message as seen
      if (messages.length > 0) {

        const lastMessage =
          messages[messages.length - 1];


        localStorage.setItem(
          `lastSeenMessage_${request.id}`,
          lastMessage.id
        );

      }


      // Recalculate notification count
      checkNewMessages();


    } catch (error) {

      console.error(
        "Open Chat Error:",
        error
      );

    }


    // Navigate to chat
    navigate("/chat", {
      state: {
        request: request,
      },
    });

  };


  // =========================
  // UPDATE REQUEST STATUS
  // =========================

  const handleStatus = async (
    requestId,
    status
  ) => {

    try {

      const data =
        await updateRequestStatus(
          requestId,
          status
        );


      alert(data.message);


      fetchRequests();

    } catch (error) {

      console.error(
        "Update Request Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to update request"
      );

    }

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
      title: "Active Learners",
      value: "45",
      icon: <FaUsers />,
    },

    {
      title: "Courses Mentored",
      value: "12",
      icon: <FaBookOpen />,
    },

    {
      title: "Certificates Issued",
      value: "30",
      icon: <FaCertificate />,
    },

    {
      title: "Earnings",
      value: "₹12,500",
      icon: <FaRupeeSign />,
    },

  ];


  // =========================
  // OPEN NOTIFICATIONS
  // =========================

  const openNotifications = () => {

    const firstAcceptedRequest =
      requests.find(
        (request) =>
          request.status?.toLowerCase() ===
          "accepted"
      );


    if (firstAcceptedRequest) {

      openChat(firstAcceptedRequest);

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
            Mentor Dashboard
          </h1>

          <p className="text-slate-400">
            Welcome back! Manage your skills and learners from one place.
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


          {/* RED NOTIFICATION BADGE */}

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
          ACTION BUTTONS
      ========================= */}

      <div className="flex flex-wrap gap-4 mb-10">


        <Link
          to="/add-skill"
          className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl transition duration-300 font-semibold"
        >

          <FaPlusCircle />

          Add Skill

        </Link>


        <Link
          to="/skills"
          className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl transition duration-300 font-semibold"
        >

          <FaBookOpen />

          View Skills

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
          MENTOR VIDEO UPLOAD
      ========================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <FaVideo className="text-blue-500" />
          Upload a Video
        </h2>

        <p className="text-slate-400 mb-6">
          Only <span className="text-white font-semibold">.mp4</span> and{" "}
          <span className="text-white font-semibold">.mkv</span> video files
          are accepted.
        </p>

        <form onSubmit={handleVideoUpload} className="space-y-4 max-w-xl">

          <input
            type="text"
            placeholder="Video Title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
            required
          />

          <textarea
            placeholder="Video Description (optional)"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
            rows="3"
          />

          <input
            id="mentorVideoInput"
            type="file"
            accept=".mp4,.mkv,video/mp4,video/x-matroska"
            onChange={handleVideoFileChange}
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold file:cursor-pointer"
            required
          />

          <button
            type="submit"
            disabled={uploadingVideo}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl transition duration-300 font-semibold"
          >
            <FaUpload />
            {uploadingVideo ? "Uploading..." : "Upload Video"}
          </button>

        </form>

        {/* MY UPLOADED VIDEOS */}

        <div className="mt-10">

          <h3 className="text-xl font-semibold mb-4">
            My Uploaded Videos
          </h3>

          {loadingVideos ? (

            <p className="text-slate-400">Loading videos...</p>

          ) : myVideos.length === 0 ? (

            <p className="text-slate-400">
              You haven't uploaded any videos yet.
            </p>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {myVideos.map((video) => (

                <div
                  key={video.id}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                >

                  <h4 className="font-semibold text-blue-400 mb-2">
                    {video.title}
                  </h4>

                  <video
                    controls
                    className="w-full rounded-lg mb-2"
                    src={`http://localhost:5000${video.link}`}
                  />

                  {video.description && (
                    <p className="text-slate-400 text-sm">
                      {video.description}
                    </p>
                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* =========================
          LEARNING REQUESTS
      ========================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">


        <h2 className="text-2xl font-bold mb-6">
          Learning Requests
        </h2>


        {loadingRequests ? (

          <p className="text-slate-400">
            Loading requests...
          </p>

        ) : requests.length === 0 ? (

          <p className="text-slate-400">
            No learning requests yet.
          </p>

        ) : (

          <div className="space-y-4">


            {requests.map((request) => (

              <div
                key={request.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-5"
              >


                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


                  {/* REQUEST INFORMATION */}

                  <div>

                    <h3 className="text-xl font-semibold text-blue-400">
                      {request.skill}
                    </h3>


                    <p className="text-slate-300 mt-2">
                      Learner:{" "}
                      {request.learnerName ||
                        "Unknown Learner"}
                    </p>


                    <p className="text-slate-400 text-sm mt-1">
                      Request ID:{" "}
                      {request.id}
                    </p>

                  </div>


                  {/* STATUS + CHAT */}

                  <div className="flex items-center gap-3 flex-wrap">


                    {/* STATUS */}

                    <span
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        request.status ===
                        "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : request.status ===
                            "Accepted"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >

                      {request.status}

                    </span>


                    {/* ACCEPT / REJECT */}

                    {request.status ===
                      "Pending" && (

                      <>

                        <button
                          onClick={() =>
                            handleStatus(
                              request.id,
                              "Accepted"
                            )
                          }
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
                        >

                          <FaCheck />

                          Accept

                        </button>


                        <button
                          onClick={() =>
                            handleStatus(
                              request.id,
                              "Rejected"
                            )
                          }
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
                        >

                          <FaTimes />

                          Reject

                        </button>

                      </>

                    )}


                    {/* CHAT */}

                    {request.status ===
                      "Accepted" && (

                      <button
                        onClick={() =>
                          openChat(request)
                        }
                        className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
                      >

                        <FaComments />

                        Chat

                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}


export default MentorDashboard;