import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-green-400 hover:text-green-300 transition"
        >
          EcoStay AI 🌿
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-lg">

          <Link
            to="/"
            className="hover:text-green-400 transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-green-400 transition"
          >
            About
          </Link>

          {token && (
            <Link
              to="/dashboard"
              className="hover:text-green-400 transition"
            >
              Dashboard
            </Link>
          )}
          <Link to="/ai-planner">AI Planner</Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-green-500 text-green-400 hover:bg-green-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;