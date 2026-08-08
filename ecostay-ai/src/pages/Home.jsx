import { useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  const destinationsRef = useRef(null);

  const handleExplore = () => {
    destinationsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const destinations = [
  {
    name: "Delhi",
    slug: "delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
  },
  {
    name: "Goa",
    slug: "goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
  },
  {
    name: "Manali",
    slug: "manali",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
  },
  {
    name: "Kerala",
    slug: "kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
  },
  {
    name: "Udaipur",
    slug: "udaipur",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245",
  },
  {
    name: "Rishikesh",
    slug: "rishikesh",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358",
  },
  {
    name: "Mysore",
    slug: "mysore",
    image:
      "https://images.unsplash.com/photo-1524613032530-449a5d94c285?auto=format&fit=crop&w=1200&q=80",
  },
];

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <Hero onExplore={handleExplore} />

      {/* Destinations */}
      <section
        ref={destinationsRef}
        className="bg-white py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold tracking-wide">
              DESTINATIONS
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 mt-4">
              Find a place that feels right for your next journey.
            </p>
          </div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.slug}
                className="relative h-[430px] rounded-2xl overflow-hidden shadow-lg group"
              >
                {/* Image */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* City + Button */}
                <div className="absolute bottom-0 left-0 right-0 text-center text-white p-8">

                  <h3 className="text-4xl font-bold mb-5">
                    {destination.name}
                  </h3>

                  <Link
                    to={`/destination/${destination.slug}`}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition duration-300"
                  >
                    Discover More
                  </Link>

                </div>
              </div>
            ))}
                  </div>

          {/* Register Prompt */}
          <div className="text-center mt-16 bg-green-50 rounded-2xl p-10">
            <h3 className="text-3xl font-bold mb-3">
              Want to explore more?
            </h3>

            <p className="text-gray-600 text-lg mb-6">
              Register with EcoStay AI to discover more destinations,
              homestays, experiences, and hidden gems.
            </p>

            <Link
              to="/register"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Register to Explore More
            </Link>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;