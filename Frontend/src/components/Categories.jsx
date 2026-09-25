import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    "💻 Programming",
    "🎨 Design",
    "📸 Photography",
    "🎵 Music",
    "🍳 Cooking",
    "🗣️ Languages",
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold text-center mb-4">
        Skill Categories
      </h2>

      <p className="text-center text-gray-400 mb-12">
        Explore different categories and start learning from experts.
      </p>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {categories.map((item, index) => (
          <Link
            key={index}
            to="/skills"
            className="bg-gray-800 border border-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-600 hover:border-blue-400 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300"
          >
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;