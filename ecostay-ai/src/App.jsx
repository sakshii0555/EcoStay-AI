import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Showcase from "./pages/Showcase";
import Register from "./pages/Register";
import AIPlanner from "./pages/AIPlanner";
import Statepage from "./pages/Statepage";
import DistrictPage from "./pages/DistrictPage";
import Explore from "./pages/Explore";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* ================= HOME ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* ================= AUTHENTICATION ================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ================= PUBLIC EXPLORE ================= */}

                <Route
                    path="/explore"
                    element={<Explore />}
                />

                {/* ================= STATE ================= */}

                {/* Temporary - we will remove this later */}
                <Route
                    path="/state/:stateId"
                    element={<Statepage />}
                />

                {/* ================= DISTRICT ================= */}

                <Route
                    path="/district/:stateId/:districtId"
                    element={<DistrictPage />}
                />

                {/* ================= OTHER PAGES ================= */}

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/ai-planner"
                    element={<AIPlanner />}
                />

                <Route
                    path="/showcase"
                    element={<Showcase />}
                />

                {/* ================= PROTECTED DASHBOARD ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;