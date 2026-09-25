import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-3xl font-bold text-blue-500">
          SkillXchange
        </h1>

        <ul className="flex gap-8 text-lg">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/skills" className="hover:text-blue-400">Skills</Link></li>
          <li><Link to="/mentors" className="hover:text-blue-400">Mentors</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
        </ul>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 border border-blue-500 rounded-lg hover:bg-blue-500"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;