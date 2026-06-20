import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Navbar />

      <Hero />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-8">
        <Card
          title="Mountain View Homestay"
          description="Experience nature in a sustainable mountain retreat."
        />

        <Card
          title="Forest Eco Lodge"
          description="Stay close to nature while supporting responsible tourism."
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;