import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Registration Successful!");
                navigate("/login");
            } else {
                console.log(data);
                alert(data.message || JSON.stringify(data));
            }
        } catch (error) {
            console.error(error);
            alert("Registration Failed");
        }
    };

    return (
        <>
            <Navbar />

            {/* ================= REGISTER PAGE ================= */}
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


                {/* ================= REGISTER CARD ================= */}
                <div className="relative z-10 w-full max-w-md">

                    <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 border border-white/40">

                        {/* Heading */}
                        <div className="text-center mb-8">

                            <div className="text-4xl mb-3">
                                🌿
                            </div>

                            <h1 className="text-4xl font-bold text-green-700 mb-2">
                                Create Account
                            </h1>

                            <p className="text-gray-600">
                                Start your EcoStay AI journey
                            </p>

                        </div>


                        {/* ================= REGISTER FORM ================= */}
                        <form
                            onSubmit={handleRegister}
                            className="space-y-5"
                        >

                            {/* Full Name */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                required
                            />


                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                required
                            />


                            {/* Password */}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl text-lg outline-none transition duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                required
                            />


                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg hover:shadow-green-500/30"
                            >
                                Create Account
                            </button>

                        </form>


                        {/* ================= LOGIN LINK ================= */}
                        <p className="text-center mt-7 text-gray-600">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-green-600 font-semibold hover:text-green-700 hover:underline transition"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Register;