import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-3xl font-bold text-blue-500">
          SkillXchange
        </h2>

        <p className="mt-3 text-slate-300">
          Learn • Teach • Grow Together
        </p>

        <div className="flex gap-6 mt-6">
          <a href="/">Home</a>
          <a href="/skills">Skills</a>
          <a href="/mentors">Mentors</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="flex gap-6 text-2xl mt-6">
          <FaGithub />
          <FaLinkedin />
          <FaEnvelope />
        </div>

        <hr className="my-6 border-slate-700" />

        <p className="text-slate-400">
          © 2026 SkillXchange. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;