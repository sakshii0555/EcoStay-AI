import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black/40 backdrop-blur-md text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">
          EcoStay AI 🌿
        </h1>

        <div className="space-x-6 text-lg">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;