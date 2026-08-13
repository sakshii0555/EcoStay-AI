import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DistrictCard from "../components/DistrictCard";
import uttarakhandDistricts from "../data/districts/uttarakhand";

function Dashboard() {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed relative"
            style={{
                backgroundImage:
                    "url('/images/dashboard-bg.jpg')",
            }}
        >
            {/* ==============================
                BACKGROUND OVERLAY
            ============================== */}

            <div className="absolute inset-0 bg-black/30"></div>

            {/* ==============================
                DASHBOARD CONTENT
            ============================== */}

            <div className="relative z-10 min-h-screen">

                <Navbar />

                <main className="max-w-6xl mx-auto pt-32 px-6 pb-16">

                    {/* ================= HEADER ================= */}

                    <div className="text-center mb-12">

                        <p className="text-green-300 font-semibold uppercase tracking-[0.2em] text-sm drop-shadow-md">
                            EcoStay AI
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 drop-shadow-lg">
                            Explore Uttarakhand 🌿
                        </h1>

                        <p className="text-white/90 text-lg mt-4 max-w-2xl mx-auto drop-shadow-md">
                            Discover the 13 districts of Uttarakhand —
                            from peaceful mountain villages and sacred towns
                            to forests, valleys and local Pahadi experiences.
                        </p>

                    </div>

                    {/* ================= DISTRICT CARDS ================= */}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {uttarakhandDistricts
                            .filter(
                                (district) =>
                                    district.id !== "udham-singh-nagar"
                            )
                            .map((district) => (
                                <DistrictCard
                                    key={district.id}
                                    district={district}
                                />
                            ))}

                    </div>

                </main>

                <Footer />

            </div>
        </div>
    );
}

export default Dashboard;