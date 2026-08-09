import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Showcase from "./pages/Showcase";
import Register from "./pages/Register";
import AIPlanner from "./pages/AIPlanner";
import Destination from "./pages/Destination";
import Statepage from "./pages/Statepage";
import DistrictPage from "./pages/DistrictPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/state/:stateId" element={<Statepage />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/ai-planner" element={<AIPlanner />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route
    path="/district/:stateId/:districtId"
    element={<DistrictPage />}
/>

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Destination Pages */}
        <Route
          path="/destination/:city"
          element={<Destination />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;