function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="p-8 rounded-xl bg-gray-800 shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-400">
          Tailwind is Working 🚀
        </h1>

        <p className="text-gray-300">
          If you see styling, Tailwind CSS is configured correctly.
        </p>

        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;