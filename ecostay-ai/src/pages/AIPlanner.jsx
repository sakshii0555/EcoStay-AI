import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

function AIPlanner() {
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [travelStyle, setTravelStyle] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    // Uses localhost while developing,
    // and can use the Render backend after deployment.
    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleGenerate = async () => {
        console.log("Generate button clicked");

        setLoading(true);
        setResult("");

        try {
            const response = await fetch(`${API_URL}/api/ai/plan`, {
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

            {/* ================= AI PLANNER PAGE ================= */}
            <div className="relative min-h-screen overflow-hidden pt-28 pb-20">

                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=85"
                    alt="Mountain travel landscape"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/55"></div>

                {/* Green Glow */}
                <div className="absolute top-20 left-10 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>

                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl"></div>


                {/* ================= PLANNER CARD ================= */}
                <div className="relative z-10 max-w-4xl mx-auto px-6">

                    <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 border border-white/40">

                        {/* Heading */}
                        <div className="text-center mb-10">

                            <p className="text-green-600 uppercase tracking-[0.25em] text-sm font-semibold mb-3">
                                Intelligent Travel Planning
                            </p>

                            <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-3">
                                AI Travel Planner 🌿
                            </h1>

                            <p className="text-gray-600 text-lg">
                                Plan your eco-friendly trip with AI
                            </p>

                        </div>


                        {/* ================= FORM ================= */}
                        <div className="space-y-5">

                            {/* Destination */}
                            <input
                                type="text"
                                placeholder="Destination"
                                value={destination}
                                onChange={(e) =>
                                    setDestination(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />


                            {/* Number of Days */}
                            <input
                                type="number"
                                placeholder="Number of Days"
                                value={days}
                                onChange={(e) =>
                                    setDays(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />


                            {/* Budget */}
                            <input
                                type="number"
                                placeholder="Budget (₹)"
                                value={budget}
                                onChange={(e) =>
                                    setBudget(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />


                            {/* Travel Style */}
                            <select
                                value={travelStyle}
                                onChange={(e) =>
                                    setTravelStyle(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-white"
                            >
                                <option value="">
                                    Select Travel Style
                                </option>

                                <option>Adventure</option>
                                <option>Nature</option>
                                <option>Luxury</option>
                                <option>Family</option>
                                <option>Budget</option>
                            </select>


                            {/* Generate Button */}
                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg hover:shadow-green-500/30 disabled:bg-green-400 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Generating your journey..."
                                    : "Generate AI Trip Plan"}
                            </button>


                            {/* ================= RESULT ================= */}
                            {result && (
                                <div className="mt-10 bg-green-50 border border-green-200 p-6 md:p-8 rounded-2xl shadow-inner">

                                    <div className="flex items-center gap-3 mb-5">

                                        <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-2xl">
                                            🤖
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-bold text-green-700">
                                                Your AI Travel Plan
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                Personalised for your journey
                                            </p>
                                        </div>

                                    </div>

                                    <div className="text-gray-700 leading-8 whitespace-pre-wrap">
                                        {result}
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            <Chatbot />

        </div>

        <Footer />
    </>
);
}

export default AIPlanner;