import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

function AIPlanner() {
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [travelStyle, setTravelStyle] = useState("");

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    // Uses localhost while developing,
    // and can use the Render backend after deployment.
    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleNext = () => {
        setError("");

        if (step === 1 && !destination.trim()) {
            setError("Tell me where you would like to go 😊");
            return;
        }

        if (step === 2 && !days) {
            setError("How many days are you planning for? 🏔️");
            return;
        }

        if (step === 3 && !budget) {
            setError("Tell me your approximate budget 💰");
            return;
        }

        if (step === 4 && !travelStyle) {
            setError("Choose the kind of experience you want 🌿");
            return;
        }

        if (step < 4) {
            setStep(step + 1);
        } else {
            handleGenerate();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setError("");
            setStep(step - 1);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        setResult("");
        setError("");

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

            const data = await response.json();

            if (data.success) {
                setResult(data.itinerary);
                setStep(5);
            } else {
                setError(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError("I couldn't reach the travel planner. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetPlanner = () => {
        setDestination("");
        setDays("");
        setBudget("");
        setTravelStyle("");
        setResult("");
        setError("");
        setStep(1);
    };

    return (
        <>
            <Navbar />

            {/* ================= AI PLANNER ================= */}

            <div className="relative min-h-screen overflow-hidden pt-28 pb-20">

                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/pahadi-hero.png')",
                    }}
                ></div>

                {/* Dark Pahadi-style overlay */}
                <div className="absolute inset-0 bg-[#17251b]/75"></div>

                {/* Warm glow */}
                <div className="absolute top-20 left-10 w-80 h-80 bg-[#f0a35b]/15 rounded-full blur-3xl"></div>

                <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/15 rounded-full blur-3xl"></div>


                {/* ================= MAIN CONTENT ================= */}

                <div className="relative z-10 max-w-5xl mx-auto px-6">

                    {/* Page heading */}

                    <div className="text-center text-white mb-10">

                        <p className="text-[#f0a35b] uppercase tracking-[0.3em] text-sm font-semibold mb-3">
                            Your Pahadi Travel Companion
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold">
                            Plan Your Journey with Pahadi Buddy 🏔️
                        </h1>

                        <p className="text-gray-200 text-lg mt-4">
                            Tell me what you're looking for and I'll help
                            you discover Uttarakhand your way.
                        </p>

                    </div>


                    {/* ================= CHAT CARD ================= */}

                    <div className="bg-[#fffaf2]/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/30">

                        <div className="grid md:grid-cols-[280px_1fr]">


                            {/* ================= MASCOT ================= */}

                            <div className="bg-[#263528] flex flex-col items-center justify-center p-8 text-center">

                                <div className="w-48 h-48 md:w-56 md:h-56 flex items-end justify-center">

                                    <img
                                        src="/images/pahadi-buddy.png"
                                        alt="Pahadi Buddy - EcoStay AI travel assistant"
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                    />

                                </div>

                                <h2 className="text-white text-2xl font-bold mt-4">
                                    Pahadi Buddy
                                </h2>

                                <p className="text-green-100 text-sm mt-2 leading-6">
                                    Your little guide to the Pahad 🌿
                                </p>

                                {/* Progress */}

                                {step < 5 && (
                                    <div className="w-full mt-7">

                                        <div className="flex justify-between text-xs text-green-100 mb-2">
                                            <span>Journey Progress</span>
                                            <span>{step}/4</span>
                                        </div>

                                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">

                                            <div
                                                className="h-full bg-[#f0a35b] rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${step * 25}%`,
                                                }}
                                            ></div>

                                        </div>

                                    </div>
                                )}

                            </div>


                            {/* ================= CHAT AREA ================= */}

                            <div className="p-7 md:p-10">


                                {/* ================= RESULT ================= */}

                                {step === 5 ? (

                                    <div>

                                        <div className="flex items-center gap-4 mb-7">

                                            <div className="w-14 h-14 rounded-full bg-[#263528] flex items-center justify-center text-3xl">
                                                🧒
                                            </div>

                                            <div>
                                                <p className="text-[#b56b45] uppercase tracking-wider text-sm font-semibold">
                                                    Pahadi Buddy says
                                                </p>

                                                <h2 className="text-2xl md:text-3xl font-bold text-[#263528]">
                                                    Your Pahadi Journey is Ready!
                                                </h2>
                                            </div>

                                        </div>


                                        <div className="bg-[#f7f1e7] border border-[#e5d7c3] rounded-2xl p-6 md:p-8">

                                            <div className="text-gray-700 leading-8 whitespace-pre-wrap">
                                                {result}
                                            </div>

                                        </div>


                                        <button
                                            onClick={resetPlanner}
                                            className="mt-7 bg-[#263528] hover:bg-[#1d291f] text-white px-7 py-3 rounded-full font-semibold transition duration-300"
                                        >
                                            Plan Another Journey ↻
                                        </button>

                                    </div>

                                ) : (

                                    <>

                                        {/* ================= CHAT MESSAGE ================= */}

                                        <div className="flex items-start gap-4 mb-8">

                                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#263528] flex items-center justify-center text-2xl">
                                                🧒
                                            </div>

                                            <div className="bg-[#f7f1e7] rounded-2xl rounded-tl-none px-5 py-4 max-w-xl">

                                                <p className="text-[#263528] font-medium leading-7">

                                                    {step === 1 &&
                                                        "Namaste! 👋 Where are we heading? Tell me which place in Uttarakhand you'd like to explore."}

                                                    {step === 2 &&
                                                        `Lovely choice! 🌿 ${destination} sounds wonderful. How many days do you have for your Pahadi escape?`}

                                                    {step === 3 &&
                                                        `Perfect! 🏔️ Now tell me your approximate budget for the trip.`}

                                                    {step === 4 &&
                                                        "Almost there! 😊 What kind of Pahadi experience are you looking for?"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* ================= STEP 1 ================= */}

                                        {step === 1 && (

                                            <div>

                                                <label className="block text-sm font-semibold text-gray-600 mb-2">
                                                    Your destination
                                                </label>

                                                <input
                                                    type="text"
                                                    value={destination}
                                                    onChange={(e) =>
                                                        setDestination(e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleNext();
                                                        }
                                                    }}
                                                    placeholder="e.g. Mussoorie, Nainital, Auli..."
                                                    className="w-full border border-gray-300 rounded-xl p-4 text-lg outline-none transition focus:border-[#b56b45] focus:ring-2 focus:ring-[#b56b45]/20"
                                                />

                                                <div className="flex flex-wrap gap-2 mt-4">

                                                    {[
                                                        "Mussoorie",
                                                        "Nainital",
                                                        "Rishikesh",
                                                        "Auli",
                                                        "Chopta",
                                                    ].map((place) => (

                                                        <button
                                                            key={place}
                                                            onClick={() =>
                                                                setDestination(place)
                                                            }
                                                            className="px-4 py-2 rounded-full bg-[#f7f1e7] hover:bg-[#e9dcc9] text-[#263528] text-sm font-medium transition"
                                                        >
                                                            {place}
                                                        </button>

                                                    ))}

                                                </div>

                                            </div>

                                        )}


                                        {/* ================= STEP 2 ================= */}

                                        {step === 2 && (

                                            <div>

                                                <label className="block text-sm font-semibold text-gray-600 mb-2">
                                                    How long are we staying?
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={days}
                                                    onChange={(e) =>
                                                        setDays(e.target.value)
                                                    }
                                                    placeholder="Number of days"
                                                    className="w-full border border-gray-300 rounded-xl p-4 text-lg outline-none transition focus:border-[#b56b45] focus:ring-2 focus:ring-[#b56b45]/20"
                                                />

                                                <div className="flex flex-wrap gap-3 mt-4">

                                                    {[2, 3, 4, 5, 7].map((number) => (

                                                        <button
                                                            key={number}
                                                            onClick={() =>
                                                                setDays(String(number))
                                                            }
                                                            className="px-5 py-3 rounded-xl bg-[#f7f1e7] hover:bg-[#e9dcc9] text-[#263528] font-semibold transition"
                                                        >
                                                            {number} days
                                                        </button>

                                                    ))}

                                                </div>

                                            </div>

                                        )}


                                        {/* ================= STEP 3 ================= */}

                                        {step === 3 && (

                                            <div>

                                                <label className="block text-sm font-semibold text-gray-600 mb-2">
                                                    What's your trip budget?
                                                </label>

                                                <div className="relative">

                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                                        ₹
                                                    </span>

                                                    <input
                                                        type="number"
                                                        value={budget}
                                                        onChange={(e) =>
                                                            setBudget(e.target.value)
                                                        }
                                                        placeholder="Approximate budget"
                                                        className="w-full border border-gray-300 rounded-xl p-4 pl-9 text-lg outline-none transition focus:border-[#b56b45] focus:ring-2 focus:ring-[#b56b45]/20"
                                                    />

                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

                                                    {[
                                                        "5000",
                                                        "10000",
                                                        "20000",
                                                        "30000",
                                                    ].map((amount) => (

                                                        <button
                                                            key={amount}
                                                            onClick={() =>
                                                                setBudget(amount)
                                                            }
                                                            className="py-3 rounded-xl bg-[#f7f1e7] hover:bg-[#e9dcc9] text-[#263528] font-semibold transition"
                                                        >
                                                            ₹{Number(amount).toLocaleString()}
                                                        </button>

                                                    ))}

                                                </div>

                                            </div>

                                        )}


                                        {/* ================= STEP 4 ================= */}

                                        {step === 4 && (

                                            <div>

                                                <label className="block text-sm font-semibold text-gray-600 mb-4">
                                                    Choose your Pahadi vibe
                                                </label>

                                                <div className="grid grid-cols-2 gap-3">

                                                    {[
                                                        {
                                                            name: "Nature",
                                                            icon: "🌿",
                                                        },
                                                        {
                                                            name: "Adventure",
                                                            icon: "🏔️",
                                                        },
                                                        {
                                                            name: "Local Life",
                                                            icon: "🏡",
                                                        },
                                                        {
                                                            name: "Culture",
                                                            icon: "🛕",
                                                        },
                                                        {
                                                            name: "Food",
                                                            icon: "🍲",
                                                        },
                                                        {
                                                            name: "Relaxed",
                                                            icon: "☕",
                                                        },
                                                    ].map((style) => (

                                                        <button
                                                            key={style.name}
                                                            onClick={() =>
                                                                setTravelStyle(style.name)
                                                            }
                                                            className={`p-4 rounded-xl border text-left transition duration-300 ${
                                                                travelStyle === style.name
                                                                    ? "border-[#b56b45] bg-[#f7f1e7] shadow-sm"
                                                                    : "border-gray-200 hover:border-[#b56b45]/50 hover:bg-[#faf7f1]"
                                                            }`}
                                                        >

                                                            <div className="text-2xl mb-1">
                                                                {style.icon}
                                                            </div>

                                                            <div className="font-semibold text-[#263528]">
                                                                {style.name}
                                                            </div>

                                                        </button>

                                                    ))}

                                                </div>

                                            </div>

                                        )}


                                        {/* ================= ERROR ================= */}

                                        {error && (

                                            <p className="text-red-500 text-sm mt-5">
                                                {error}
                                            </p>

                                        )}


                                        {/* ================= BUTTONS ================= */}

                                        <div className="flex gap-3 mt-8">

                                            {step > 1 && (

                                                <button
                                                    onClick={handleBack}
                                                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold transition"
                                                >
                                                    ← Back
                                                </button>

                                            )}

                                            <button
                                                onClick={handleNext}
                                                disabled={loading}
                                                className="flex-1 bg-[#263528] hover:bg-[#1d291f] text-white py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {loading
                                                    ? "Pahadi Buddy is planning... 🏔️"
                                                    : step === 4
                                                    ? "Create My Pahadi Journey →"
                                                    : "Continue →"}
                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

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