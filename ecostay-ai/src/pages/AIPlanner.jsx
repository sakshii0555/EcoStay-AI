import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

function AIPlanner() {
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [travelStyle, setTravelStyle] = useState("");

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Namaste! 👋 I'm your Pahadi Buddy. Where are we heading in Uttarakhand?",
        },
    ]);

    const [currentStep, setCurrentStep] = useState("destination");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const messagesEndRef = useRef(null);

    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    /* ================= MASCOT ANIMATIONS ================= */

    const mascotStyles = `
        @keyframes buddyFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }

            25% {
                transform: translateY(-5px) rotate(-1deg);
            }

            50% {
                transform: translateY(-12px) rotate(1deg);
            }

            75% {
                transform: translateY(-5px) rotate(-1deg);
            }
        }

        @keyframes buddyThink {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }

            25% {
                transform: translateY(-5px) rotate(-3deg);
            }

            50% {
                transform: translateY(-10px) rotate(3deg);
            }

            75% {
                transform: translateY(-5px) rotate(-2deg);
            }
        }

        @keyframes buddyCelebrate {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }

            20% {
                transform: translateY(-12px) rotate(-5deg);
            }

            40% {
                transform: translateY(0px) rotate(5deg);
            }

            60% {
                transform: translateY(-12px) rotate(-5deg);
            }

            80% {
                transform: translateY(0px) rotate(5deg);
            }
        }

        @keyframes bubbleFloat {
            0%, 100% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-5px);
            }
        }

        @keyframes shadowPulse {
            0%, 100% {
                transform: scaleX(1);
                opacity: 0.25;
            }

            50% {
                transform: scaleX(0.75);
                opacity: 0.12;
            }
        }

        @keyframes sparkle {
            0%, 100% {
                transform: translateY(0px) scale(1);
                opacity: 0.6;
            }

            50% {
                transform: translateY(-8px) scale(1.15);
                opacity: 1;
            }
        }
    `;

    /* ================= AUTO SCROLL ================= */

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading, result]);

    /* ================= ADD MESSAGE ================= */

    const addMessage = (sender, text) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                sender,
                text,
            },
        ]);
    };

    /* ================= HANDLE USER ANSWER ================= */

    const handleAnswer = (value = input) => {
        const answer = value.trim();

        if (!answer) return;

        setError("");

        /* Destination */

        if (currentStep === "destination") {
            setDestination(answer);

            addMessage("user", answer);

            setInput("");

            setTimeout(() => {
                setCurrentStep("days");

                addMessage(
                    "bot",
                    `Wah! 🌿 ${answer} sounds wonderful. How many days are we planning for?`
                );
            }, 350);

            return;
        }

        /* Days */

        if (currentStep === "days") {
            setDays(answer);

            addMessage("user", `${answer} days`);

            setInput("");

            setTimeout(() => {
                setCurrentStep("budget");

                addMessage(
                    "bot",
                    "Badhiya! 🏔️ Now tell me your approximate budget for the trip."
                );
            }, 350);

            return;
        }

        /* Budget */

        if (currentStep === "budget") {
            setBudget(answer);

            addMessage(
                "user",
                `₹${Number(answer).toLocaleString("en-IN")}`
            );

            setInput("");

            setTimeout(() => {
                setCurrentStep("style");

                addMessage(
                    "bot",
                    "Almost there! 😊 What kind of Pahadi experience are you looking for?"
                );
            }, 350);

            return;
        }

        /* Travel Style */

        if (currentStep === "style") {
            setTravelStyle(answer);

            addMessage("user", answer);

            setInput("");

            setTimeout(() => {
                addMessage(
                    "bot",
                    "Bas! 🏔️ I've got everything I need. Let me create your Pahadi journey..."
                );

                generateJourney(
                    destination,
                    days,
                    budget,
                    answer
                );
            }, 400);
        }
    };

    /* ================= GENERATE JOURNEY ================= */

    const generateJourney = async (
        finalDestination = destination,
        finalDays = days,
        finalBudget = budget,
        finalTravelStyle = travelStyle
    ) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/ai/plan`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    destination: finalDestination,
                    days: finalDays,
                    budget: finalBudget,
                    travelStyle: finalTravelStyle,
                }),
            });

            const data = await response.json();

            if (data.success) {
                /*
                 * Save the generated itinerary.
                 * This will now actually be displayed below.
                 */
                setResult(data.itinerary);

                setTimeout(() => {
                    addMessage(
                        "bot",
                        "Your Pahadi journey is ready! ✨🏔️ I've planned it specially for you."
                    );
                }, 300);
            } else {
                setError(
                    data.message ||
                        "I couldn't create your journey. Please try again."
                );
            }
        } catch (error) {
            console.error("Fetch error:", error);

            setError(
                "I couldn't reach the travel planner right now. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    /* ================= QUICK OPTIONS ================= */

    const destinationOptions = [
        "Mussoorie",
        "Nainital",
        "Rishikesh",
        "Auli",
        "Chopta",
    ];

    const daysOptions = [
        "2",
        "3",
        "4",
        "5",
        "7",
    ];

    const budgetOptions = [
        "5000",
        "10000",
        "20000",
        "30000",
    ];

    const styleOptions = [
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
    ];

    /* ================= RESET ================= */

    const resetPlanner = () => {
        setDestination("");
        setDays("");
        setBudget("");
        setTravelStyle("");
        setInput("");
        setResult("");
        setError("");
        setLoading(false);
        setCurrentStep("destination");

        setMessages([
            {
                id: Date.now(),
                sender: "bot",
                text: "Namaste! 👋 I'm your Pahadi Buddy. Where are we heading in Uttarakhand?",
            },
        ]);
    };

    /* ================= ENTER KEY ================= */

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAnswer();
        }
    };

    return (
        <>
            <style>{mascotStyles}</style>

            <Navbar />

            {/* ================= AI PLANNER PAGE ================= */}

            <div className="relative min-h-screen overflow-hidden pt-28 pb-20">

                {/* ================= BACKGROUND ================= */}

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/pahadi-hero.png')",
                    }}
                ></div>

                {/* Dark overlay */}

                <div className="absolute inset-0 bg-[#17251b]/75"></div>

                {/* Green glow */}

                <div className="absolute top-20 left-10 w-80 h-80 bg-[#f0a35b]/15 rounded-full blur-3xl"></div>

                <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/15 rounded-full blur-3xl"></div>


                {/* ================= MAIN ================= */}

                <div className="relative z-10 max-w-6xl mx-auto px-6">

                    {/* ================= HEADER ================= */}

                    <div className="text-center text-white mb-10">

                        <p className="text-[#f0a35b] uppercase tracking-[0.3em] text-sm font-semibold mb-3">
                            Your Pahadi Travel Companion
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold">
                            Plan Your Journey with Pahadi Buddy 🏔️
                        </h1>

                        <p className="text-gray-200 text-lg mt-4">
                            Tell me what you're looking for and let's
                            discover Uttarakhand together.
                        </p>

                    </div>


                    {/* ================= CHAT CARD ================= */}

                    <div className="bg-[#fffaf2]/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/30">

                        <div className="grid md:grid-cols-[280px_1fr]">


                            {/* ================================================= */}
                            {/* ================= MASCOT PANEL ================= */}
                            {/* ================================================= */}

                            <div className="bg-[#263528] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">

                                {/* Decorative sparkles */}

                                <div
                                    className="absolute top-12 left-10 text-[#f0a35b] text-xl"
                                    style={{
                                        animation:
                                            "sparkle 2.5s ease-in-out infinite",
                                    }}
                                >
                                    ✦
                                </div>

                                <div
                                    className="absolute top-24 right-10 text-green-300 text-lg"
                                    style={{
                                        animation:
                                            "sparkle 2s ease-in-out infinite",
                                        animationDelay: "0.7s",
                                    }}
                                >
                                    ✦
                                </div>


                                {/* Mascot area */}

                                <div className="relative w-56 h-72 flex items-end justify-center">

                                    {/* Speech bubble */}

                                    <div
                                        className="absolute -top-2 right-0 z-20 bg-white text-[#263528] px-4 py-2 rounded-2xl shadow-lg text-sm font-semibold"
                                        style={{
                                            animation:
                                                "bubbleFloat 3s ease-in-out infinite",
                                        }}
                                    >

                                        {loading
                                            ? "Thinking... 🤔"
                                            : result
                                            ? "We did it! 🎉"
                                            : "Namaste! 👋"}

                                        {/* Bubble tail */}

                                        <div className="absolute bottom-[-6px] left-6 w-3 h-3 bg-white rotate-45"></div>

                                    </div>


                                    {/* Mascot */}

                                    <div
                                        className="relative z-10"
                                        style={{
                                            animation: loading
                                                ? "buddyThink 1.5s ease-in-out infinite"
                                                : result
                                                ? "buddyCelebrate 1.2s ease-in-out infinite"
                                                : "buddyFloat 3s ease-in-out infinite",
                                        }}
                                    >

                                        <img
                                            src="/images/pahadi-buddy.png"
                                            alt="Pahadi Buddy - EcoStay AI travel assistant"
                                            className="w-52 h-64 object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.4)]"
                                        />

                                    </div>


                                    {/* Animated ground shadow */}

                                    <div
                                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-36 h-6 bg-black/40 rounded-full blur-md"
                                        style={{
                                            animation:
                                                "shadowPulse 3s ease-in-out infinite",
                                        }}
                                    ></div>

                                </div>


                                {/* Mascot name */}

                                <h2 className="text-white text-2xl font-bold mt-4">
                                    Pahadi Buddy
                                </h2>

                                <p className="text-green-100 text-sm mt-2 leading-6">
                                    Your little guide to the Pahad 🌿
                                </p>


                                {/* Status */}

                                <div className="mt-5">

                                    {loading ? (

                                        <div className="text-[#f0a35b] text-sm font-semibold animate-pulse">
                                            Planning your journey... 🏔️
                                        </div>

                                    ) : result ? (

                                        <div className="text-green-300 text-sm font-semibold">
                                            Journey ready! ✨
                                        </div>

                                    ) : (

                                        <div className="text-green-200/70 text-xs">
                                            Online • Ready to help
                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ================================================= */}
                            {/* ================= CHAT PANEL ==================== */}
                            {/* ================================================= */}

                            <div className="flex flex-col min-h-[650px]">


                                {/* CHAT HEADER */}

                                <div className="px-6 py-5 border-b border-[#e5d7c3] bg-[#fffdf8]">

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-full bg-[#263528] flex items-center justify-center text-xl">
                                            🧒
                                        </div>

                                        <div>

                                            <h2 className="font-bold text-[#263528]">
                                                Pahadi Buddy
                                            </h2>

                                            <p className="text-xs text-green-600">
                                                ● Your Uttarakhand travel helper
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* ================================================= */}
                                {/* ================= MESSAGES ====================== */}
                                {/* ================================================= */}

                                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 max-h-[600px]">

                                    {messages.map((message) => (

                                        <div
                                            key={message.id}
                                            className={`flex ${
                                                message.sender === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >

                                            {/* Bot icon */}

                                            {message.sender === "bot" && (

                                                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#263528] flex items-center justify-center text-lg mr-3">
                                                    🧒
                                                </div>

                                            )}


                                            {/* Message */}

                                            <div
                                                className={`max-w-[80%] px-5 py-3 rounded-2xl leading-7 ${
                                                    message.sender === "user"
                                                        ? "bg-[#263528] text-white rounded-br-sm"
                                                        : "bg-[#f7f1e7] text-[#263528] rounded-bl-sm"
                                                }`}
                                            >
                                                {message.text}
                                            </div>

                                        </div>

                                    ))}


                                    {/* THINKING */}

                                    {loading && (

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-full bg-[#263528] flex items-center justify-center">
                                                🧒
                                            </div>

                                            <div className="bg-[#f7f1e7] px-5 py-3 rounded-2xl rounded-bl-sm">

                                                <div className="flex gap-1">

                                                    <span className="w-2 h-2 bg-[#b56b45] rounded-full animate-bounce"></span>

                                                    <span
                                                        className="w-2 h-2 bg-[#b56b45] rounded-full animate-bounce"
                                                        style={{
                                                            animationDelay:
                                                                "150ms",
                                                        }}
                                                    ></span>

                                                    <span
                                                        className="w-2 h-2 bg-[#b56b45] rounded-full animate-bounce"
                                                        style={{
                                                            animationDelay:
                                                                "300ms",
                                                        }}
                                                    ></span>

                                                </div>

                                            </div>

                                        </div>

                                    )}


                                    {/* ================================================= */}
                                    {/* =============== GENERATED ITINERARY =========== */}
                                    {/* ================================================= */}

                                    {result && (

                                        <div className="mt-8">

                                            {/* Itinerary header */}

                                            <div className="flex items-center gap-3 mb-4">

                                                <div className="w-11 h-11 rounded-full bg-[#263528] flex items-center justify-center text-2xl shadow-md">
                                                    🏔️
                                                </div>

                                                <div>

                                                    <h2 className="text-xl md:text-2xl font-bold text-[#263528]">
                                                        Your Pahadi Journey ✨
                                                    </h2>

                                                    <p className="text-sm text-gray-500">
                                                        Planned specially by
                                                        Pahadi Buddy
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Trip summary */}

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

                                                <div className="bg-[#f7f1e7] rounded-xl p-3 text-center">

                                                    <p className="text-xs text-gray-500">
                                                        Destination
                                                    </p>

                                                    <p className="font-semibold text-[#263528] mt-1">
                                                        {destination}
                                                    </p>

                                                </div>


                                                <div className="bg-[#f7f1e7] rounded-xl p-3 text-center">

                                                    <p className="text-xs text-gray-500">
                                                        Duration
                                                    </p>

                                                    <p className="font-semibold text-[#263528] mt-1">
                                                        {days} days
                                                    </p>

                                                </div>


                                                <div className="bg-[#f7f1e7] rounded-xl p-3 text-center">

                                                    <p className="text-xs text-gray-500">
                                                        Budget
                                                    </p>

                                                    <p className="font-semibold text-[#263528] mt-1">
                                                        ₹
                                                        {Number(
                                                            budget
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>

                                                </div>


                                                <div className="bg-[#f7f1e7] rounded-xl p-3 text-center">

                                                    <p className="text-xs text-gray-500">
                                                        Style
                                                    </p>

                                                    <p className="font-semibold text-[#263528] mt-1">
                                                        {travelStyle}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Actual AI response */}

                                            <div className="bg-white border border-[#e5d7c3] rounded-2xl p-6 shadow-sm">

                                                <div className="flex items-center gap-2 mb-4">

                                                    <span className="text-xl">
                                                        🌿
                                                    </span>

                                                    <h3 className="font-bold text-[#263528]">
                                                        Your Itinerary
                                                    </h3>

                                                </div>

                                                <div className="text-gray-700 leading-8 whitespace-pre-wrap">
                                                    {result}
                                                </div>

                                            </div>

                                        </div>

                                    )}


                                    {/* Error */}

                                    {error && (

                                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
                                            {error}
                                        </div>

                                    )}


                                    <div ref={messagesEndRef}></div>

                                </div>


                                {/* ================================================= */}
                                {/* ================= QUICK OPTIONS ================= */}
                                {/* ================================================= */}

                                {!loading && !result && (

                                    <div className="px-6 md:px-8 pb-4">

                                        {/* Destination */}

                                        {currentStep === "destination" && (

                                            <div className="flex flex-wrap gap-2">

                                                {destinationOptions.map(
                                                    (place) => (

                                                        <button
                                                            key={place}
                                                            onClick={() =>
                                                                handleAnswer(
                                                                    place
                                                                )
                                                            }
                                                            className="px-4 py-2 rounded-full bg-[#f7f1e7] hover:bg-[#e7d9c6] text-[#263528] text-sm font-medium transition"
                                                        >
                                                            {place}
                                                        </button>

                                                    )
                                                )}

                                            </div>

                                        )}


                                        {/* Days */}

                                        {currentStep === "days" && (

                                            <div className="flex flex-wrap gap-2">

                                                {daysOptions.map(
                                                    (number) => (

                                                        <button
                                                            key={number}
                                                            onClick={() =>
                                                                handleAnswer(
                                                                    number
                                                                )
                                                            }
                                                            className="px-4 py-2 rounded-full bg-[#f7f1e7] hover:bg-[#e7d9c6] text-[#263528] text-sm font-medium transition"
                                                        >
                                                            {number} days
                                                        </button>

                                                    )
                                                )}

                                            </div>

                                        )}


                                        {/* Budget */}

                                        {currentStep === "budget" && (

                                            <div className="flex flex-wrap gap-2">

                                                {budgetOptions.map(
                                                    (amount) => (

                                                        <button
                                                            key={amount}
                                                            onClick={() =>
                                                                handleAnswer(
                                                                    amount
                                                                )
                                                            }
                                                            className="px-4 py-2 rounded-full bg-[#f7f1e7] hover:bg-[#e7d9c6] text-[#263528] text-sm font-medium transition"
                                                        >
                                                            ₹
                                                            {Number(
                                                                amount
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </button>

                                                    )
                                                )}

                                            </div>

                                        )}


                                        {/* Travel Style */}

                                        {currentStep === "style" && (

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                                                {styleOptions.map(
                                                    (style) => (

                                                        <button
                                                            key={style.name}
                                                            onClick={() =>
                                                                handleAnswer(
                                                                    style.name
                                                                )
                                                            }
                                                            className="p-3 rounded-xl bg-[#f7f1e7] hover:bg-[#e7d9c6] text-[#263528] text-sm font-semibold transition"
                                                        >

                                                            <span className="text-xl mr-2">
                                                                {
                                                                    style.icon
                                                                }
                                                            </span>

                                                            {style.name}

                                                        </button>

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>

                                )}


                                {/* ================================================= */}
                                {/* ================= INPUT ========================= */}
                                {/* ================================================= */}

                                {!result && (

                                    <div className="p-5 md:p-6 border-t border-[#e5d7c3] bg-[#fffdf8]">

                                        <div className="flex gap-3">

                                            <input
                                                type={
                                                    currentStep === "days" ||
                                                    currentStep === "budget"
                                                        ? "number"
                                                        : "text"
                                                }
                                                value={input}
                                                onChange={(e) =>
                                                    setInput(e.target.value)
                                                }
                                                onKeyDown={handleKeyDown}
                                                disabled={loading}
                                                placeholder={
                                                    currentStep === "destination"
                                                        ? "Type a destination..."
                                                        : currentStep === "days"
                                                        ? "How many days?"
                                                        : currentStep === "budget"
                                                        ? "Your budget in ₹..."
                                                        : "Choose your Pahadi vibe..."
                                                }
                                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#b56b45] focus:ring-2 focus:ring-[#b56b45]/20 disabled:bg-gray-100"
                                            />

                                            <button
                                                onClick={() =>
                                                    handleAnswer()
                                                }
                                                disabled={
                                                    loading ||
                                                    !input.trim()
                                                }
                                                className="px-5 md:px-7 rounded-xl bg-[#263528] hover:bg-[#1d291f] text-white font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Send
                                            </button>

                                        </div>

                                        <p className="text-xs text-gray-400 mt-3 text-center">
                                            Your Pahadi Buddy will guide you
                                            step-by-step 🌿
                                        </p>

                                    </div>

                                )}


                                {/* ================================================= */}
                                {/* ================= RESET ========================= */}
                                {/* ================================================= */}

                                {result && (

                                    <div className="p-5 md:p-6 border-t border-[#e5d7c3] bg-[#fffdf8]">

                                        <button
                                            onClick={resetPlanner}
                                            className="w-full bg-[#263528] hover:bg-[#1d291f] text-white py-3 rounded-xl font-semibold transition shadow-lg"
                                        >
                                            ↻ Plan Another Pahadi Journey
                                        </button>

                                    </div>

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