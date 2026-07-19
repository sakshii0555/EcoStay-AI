import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AIPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

   const handleGenerate = async () => {
  console.log("Generate button clicked");

  setLoading(true);
  setResult("");

  try {
    const response = await fetch("http://localhost:5000/api/ai/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination,
        days,
        budget,
        travelStyle,
      }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    if (data.success) {
      setResult(data.itinerary);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to generate itinerary.");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-28 pb-16">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

          <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
            AI Travel Planner 🌿
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Plan your eco-friendly trip with AI
          </p>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Number of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Budget (₹)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Travel Style</option>
              <option>Adventure</option>
              <option>Nature</option>
              <option>Luxury</option>
              <option>Family</option>
              <option>Budget</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:bg-green-400"
            >
              {loading ? "Generating..." : "Generate AI Trip Plan"}
            </button>

            {result && (
              <div className="mt-8 bg-gray-100 p-6 rounded-lg whitespace-pre-wrap border">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Your AI Travel Plan
                </h2>

                <p>{result}</p>
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default AIPlanner;