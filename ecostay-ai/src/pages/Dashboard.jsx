import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/homestays")
      .then((res) => res.json())
      .then((data) => {
        setHomestays(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Available Homestays
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => (
            <div
              key={homestay.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {homestay.name}
              </h2>

              <p className="mt-2">
                📍 {homestay.location}
              </p>

              <p className="mt-2">
                💰 ₹{homestay.price}
              </p>

              <p className="mt-2">
                ⭐ {homestay.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;