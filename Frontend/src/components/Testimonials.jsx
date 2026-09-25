function Testimonials() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        What Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        <div className="shadow-lg p-6 rounded-xl">
          <p>⭐⭐⭐⭐⭐</p>
          <p>I learned Python through SkillXchange.</p>
          <h4 className="font-bold mt-3">Ravi</h4>
        </div>

        <div className="shadow-lg p-6 rounded-xl">
          <p>⭐⭐⭐⭐⭐</p>
          <p>Excellent mentors and resources.</p>
          <h4 className="font-bold mt-3">Priya</h4>
        </div>

        <div className="shadow-lg p-6 rounded-xl">
          <p>⭐⭐⭐⭐⭐</p>
          <p>Great platform for sharing skills.</p>
          <h4 className="font-bold mt-3">Arjun</h4>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;