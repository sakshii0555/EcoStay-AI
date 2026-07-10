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
    <nav className="bg-black/40 backdrop-blur-md text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">
          EcoStay AI 🌿
        </h1>

        <div className="space-x-6 text-lg flex items-center">

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          {token && (
            <Link to="/dashboard">Dashboard</Link>
          )}

          {!token ? (
            <Link
              to="/login"
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
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