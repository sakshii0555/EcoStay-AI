import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    alert("Logged out successfully!");

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">

        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-green-400
            hover:text-green-300
            transition
            whitespace-nowrap
          "
        >
          EcoStay AI 🌿
        </Link>


        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <div className="hidden md:flex items-center gap-6 text-lg">

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

          <Link
            to="/ai-planner"
            className="hover:text-green-400 transition"
          >
            AI Planner
          </Link>


          {!token ? (
            <>
              <Link
                to="/login"
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-green-500
                  text-green-400
                  hover:bg-green-600
                  hover:text-white
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  transition
                "
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="
                px-4
                py-2
                rounded-lg
                bg-red-600
                hover:bg-red-700
                text-white
                transition
              "
            >
              Logout
            </button>
          )}

        </div>


        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden
            text-white
            text-3xl
            focus:outline-none
            ml-4
          "
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>


      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {menuOpen && (

        <div
          className="
            md:hidden
            bg-black/90
            backdrop-blur-md
            border-t
            border-white/10
            shadow-lg
          "
        >

          <div className="flex flex-col px-6 py-5 gap-4 text-lg">

            {/* Home */}

            <Link
              to="/"
              onClick={closeMenu}
              className="
                py-2
                hover:text-green-400
                transition
              "
            >
              Home
            </Link>


            {/* About */}

            <Link
              to="/about"
              onClick={closeMenu}
              className="
                py-2
                hover:text-green-400
                transition
              "
            >
              About
            </Link>


            {/* Dashboard */}

            {token && (
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="
                  py-2
                  hover:text-green-400
                  transition
                "
              >
                Dashboard
              </Link>
            )}


            {/* AI Planner */}

            <Link
              to="/ai-planner"
              onClick={closeMenu}
              className="
                py-2
                hover:text-green-400
                transition
              "
            >
              AI Planner
            </Link>


            {/* =================================================
                AUTH BUTTONS
            ================================================== */}

            {!token ? (
              <div className="flex flex-col gap-3 pt-2">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    text-center
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-green-500
                    text-green-400
                    hover:bg-green-600
                    hover:text-white
                    transition
                  "
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="
                    text-center
                    px-4
                    py-2
                    rounded-lg
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    transition
                  "
                >
                  Register
                </Link>

              </div>
            ) : (

              <button
                onClick={handleLogout}
                className="
                  w-full
                  px-4
                  py-2
                  rounded-lg
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  transition
                  mt-2
                "
              >
                Logout
              </button>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;