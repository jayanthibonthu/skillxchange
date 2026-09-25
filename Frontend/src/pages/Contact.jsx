function Contact() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full border p-3 mb-4 rounded"
      />

      <input
        type="email"
        placeholder="Your Email"
        className="w-full border p-3 mb-4 rounded"
      />

      <textarea
        placeholder="Your Message"
        className="w-full border p-3 mb-4 rounded h-32"
      ></textarea>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Send Message
      </button>
    </div>
  );
}

export default Contact;