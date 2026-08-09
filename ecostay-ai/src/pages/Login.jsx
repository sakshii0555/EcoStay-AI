import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
    const navigate = useNavigate();

    // =========================
    // LOGIN MODE
    // =========================
    const [loginMode, setLoginMode] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // HANDLE LOGIN
    // =========================
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginMode) {
            alert("Please select User Login or Admin Login.");
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            // =========================
            // CHECK USER ROLE
            // =========================

            const userRole = data.user.role;

            // User selected User Login
            if (loginMode === "user" && userRole === "admin") {
                alert(
                    "This is an admin account. Please use Admin Login."
                );
                return;
            }

            // User selected Admin Login
            if (loginMode === "admin" && userRole !== "admin") {
                alert(
                    "Access Denied! You are not the ADMIN."
                );
                return;
            }

            // =========================
            // SAVE LOGIN DATA
            // =========================

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Login Failed");
        }
    };

    // =========================
    // GOOGLE LOGIN
    // =========================
    const handleGoogleLogin = () => {
        if (loginMode !== "user") {
            alert(
                "Google Login is available for users only."
            );
            return;
        }

        window.location.href =
            `${API_URL}/api/auth/google`;
    };

    return (
        <>
            <Navbar />

            {/* ================= LOGIN PAGE ================= */}
            <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-20">

                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=85"
                    alt="Beautiful travel landscape"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/55"></div>

                {/* Green Glow */}
                <div className="absolute top-20 left-10 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>

                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>


                {/* ================= LOGIN CARD ================= */}
                <div className="relative z-10 w-full max-w-md">

                    <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 border border-white/40">

                        {/* ================= HEADING ================= */}
                        <div className="text-center mb-8">

                            <div className="text-4xl mb-3">
                                🌿
                            </div>

                            <h1 className="text-4xl font-bold text-green-700 mb-2">
                                Welcome Back
                            </h1>

                            <p className="text-gray-600">
                                Login to continue your EcoStay AI journey
                            </p>

                        </div>


                        {/* ================= LOGIN TYPE ================= */}

                        {!loginMode && (
                            <div className="space-y-4">

                                <h2 className="text-xl font-semibold text-center text-gray-800 mb-5">
                                    How do you want to login?
                                </h2>

                                {/* USER LOGIN */}
                                <button
                                    type="button"
                                    onClick={() => setLoginMode("user")}
                                    className="w-full border-2 border-green-600 bg-green-50 hover:bg-green-100 text-green-700 py-4 rounded-xl font-semibold text-lg transition duration-300"
                                >
                                    👤 Login as User
                                </button>


                                {/* ADMIN LOGIN */}
                                <button
                                    type="button"
                                    onClick={() => setLoginMode("admin")}
                                    className="w-full border-2 border-gray-700 bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg transition duration-300"
                                >
                                    🔐 Login as Admin
                                </button>

                            </div>
                        )}


                        {/* ================= USER / ADMIN FORM ================= */}

                        {loginMode && (
                            <>
                                {/* LOGIN MODE TITLE */}

                                <div className="text-center mb-6">

                                    {loginMode === "user" ? (
                                        <>
                                            <div className="text-4xl mb-2">
                                                👤
                                            </div>

                                            <h2 className="text-2xl font-bold text-green-700">
                                                User Login
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                Explore EcoStay AI
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-4xl mb-2">
                                                🔐
                                            </div>

                                            <h2 className="text-2xl font-bold text-gray-800">
                                                Admin Login
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                Authorized administrators only
                                            </p>
                                        </>
                                    )}

                                </div>


                                {/* ================= LOGIN FORM ================= */}

                                <form
                                    onSubmit={handleLogin}
                                    className="space-y-5"
                                >

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-4 rounded-xl text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-4 rounded-xl text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                        required
                                    />


                                    <button
                                        type="submit"
                                        className={`w-full text-white py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg ${
                                            loginMode === "admin"
                                                ? "bg-gray-800 hover:bg-gray-900"
                                                : "bg-green-600 hover:bg-green-700"
                                        }`}
                                    >
                                        {loginMode === "admin"
                                            ? "Login as Admin"
                                            : "Login as User"}
                                    </button>

                                </form>


                                {/* ================= CHANGE LOGIN TYPE ================= */}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginMode("");
                                        setFormData({
                                            email: "",
                                            password: "",
                                        });
                                    }}
                                    className="w-full mt-4 text-green-600 hover:text-green-700 font-semibold"
                                >
                                    ← Choose a different login type
                                </button>


                                {/* ================= GOOGLE LOGIN ================= */}

                                {loginMode === "user" && (
                                    <>
                                        <div className="flex items-center my-7">

                                            <hr className="flex-grow border-gray-300" />

                                            <span className="mx-4 text-gray-500 text-sm font-medium">
                                                OR
                                            </span>

                                            <hr className="flex-grow border-gray-300" />

                                        </div>


                                        <button
                                            type="button"
                                            onClick={handleGoogleLogin}
                                            className="w-full border border-gray-300 bg-white hover:bg-gray-50 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition duration-300 shadow-sm"
                                        >

                                            <img
                                                src="https://developers.google.com/identity/images/g-logo.png"
                                                alt="Google"
                                                className="w-5 h-5"
                                            />

                                            Sign in with Google

                                        </button>
                                    </>
                                )}

                            </>
                        )}


                        {/* ================= REGISTER LINK ================= */}

                        {!loginMode && (
                            <p className="text-center mt-7 text-gray-600">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="text-green-600 font-semibold hover:text-green-700 hover:underline transition"
                                >
                                    Register
                                </Link>

                            </p>
                        )}

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Login;