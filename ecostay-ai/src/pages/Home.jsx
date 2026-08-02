import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/homestays")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHomestays(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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

      <div className="max-w-6xl mx-auto p-8">

        {loading ? (
          <h2 className="text-center text-xl font-semibold">
            Loading homestays...
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homestays.map((homestay) => (
              <Card
                key={homestay._id}
                title={homestay.name}
                description={homestay.location}
                image={homestay.image}
                price={homestay.price}
                rating={homestay.rating}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Home;