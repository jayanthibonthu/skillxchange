function Resources() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Upload Resources
        </h1>

        <input
          type="text"
          placeholder="Resource Title"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="url"
          placeholder="YouTube Link"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="file"
          className="w-full border p-3 mb-4 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
          Upload Resource
        </button>
      </div>
    </div>
  );
}

export default Resources;