import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // =====================================================
  // DARK / LIGHT MODE
  // =====================================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });


  // Apply theme whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };


  // =====================================================
  // NAVBAR
  // =====================================================

  return (
    <nav
      className="
        bg-black/40
        dark:bg-gray-950/90
        backdrop-blur-md
        text-white
        fixed
        top-0
        left-0
        w-full
        z-50
        shadow-lg
        transition-colors
        duration-300
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          flex
          justify-between
          items-center
          px-6
          py-4
        "
      >

        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          className="
            text-3xl
            font-bold
            text-green-400
            hover:text-green-300
            transition
            whitespace-nowrap
          "
        >
          EcoStay AI 🌿
        </Link>


        {/* =================================================
            NAVIGATION LINKS
        ================================================== */}

        <div
          className="
            flex
            items-center
            gap-6
            text-lg
          "
        >

          {/* HOME */}

          <Link
            to="/"
            className="
              hover:text-green-400
              transition
            "
          >
            Home
          </Link>


          {/* ABOUT */}

          <Link
            to="/about"
            className="
              hover:text-green-400
              transition
            "
          >
            About
          </Link>


          {/* DASHBOARD */}

          {token && (
            <Link
              to="/dashboard"
              className="
                hover:text-green-400
                transition
              "
            >
              Dashboard
            </Link>
          )}


          {/* PROFILE */}

          {token && (
            <Link
              to="/profile"
              className="
                hover:text-green-400
                transition
              "
            >
              My Profile
            </Link>
          )}


          {/* AI PLANNER */}

          <Link
            to="/ai-planner"
            className="
              hover:text-green-400
              transition
            "
          >
            AI Planner
          </Link>


          {/* =================================================
              DARK / LIGHT MODE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            title={
              darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
            className="
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              text-xl
              bg-white/20
              hover:bg-white/30
              border
              border-white/30
              transition
              duration-300
            "
          >
            {darkMode ? "☀️" : "🌙"}
          </button>


          {/* =================================================
              LOGIN / REGISTER / LOGOUT
          ================================================== */}

          {!token ? (
            <>
              {/* LOGIN */}

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


              {/* REGISTER */}

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

            /* LOGOUT */

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

      </div>

    </nav>
  );
}

export default Navbar;