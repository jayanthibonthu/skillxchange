import {
  FaUsers,
  FaUserGraduate,
  FaBook,
  FaCertificate,
} from "react-icons/fa";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "500+",
      icon: <FaUsers />,
    },
    {
      title: "Total Mentors",
      value: "100+",
      icon: <FaUserGraduate />,
    },
    {
      title: "Skills Available",
      value: "50+",
      icon: <FaBook />,
    },
    {
      title: "Certificates Issued",
      value: "250+",
      icon: <FaCertificate />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-2">
        Admin Dashboard
      </h1>

      <p className="text-slate-400 mb-10">
        Monitor platform activities and statistics.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
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

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">
          Recent Platform Activity
        </h2>

        <ul className="space-y-4 text-slate-300">
          <li>👤 New Mentor Registered</li>
          <li>📚 New Skill Category Added</li>
          <li>🎓 15 Certificates Issued Today</li>
          <li>✅ 25 New Learners Joined</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;