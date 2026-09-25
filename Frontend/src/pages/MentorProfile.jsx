import { Link } from "react-router-dom";
function MentorProfile() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Ravi Kumar
        </h1>

        <p><b>Skill:</b> Python</p>

        <p><b>Experience:</b> 3 Years</p>

        <p><b>Available:</b> Mon-Fri 6 PM - 8 PM</p>

        <p><b>Rating:</b> ⭐ 4.8</p>

        <div className="mt-4">
          <h2 className="font-bold">Resources</h2>

          <p>📄 Python Notes.pdf</p>

          <p>📺 Python YouTube Playlist</p>
        </div>

        <Link
          to="/request"
          className="inline-block mt-6 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
         Send Learning Request
        </Link>
      </div>
    </div>
  );
}

export default MentorProfile;