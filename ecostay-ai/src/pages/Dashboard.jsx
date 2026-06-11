import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">
          Dashboard
        </h1>

        <p>
          Manage bookings, itineraries, and travel preferences here.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;