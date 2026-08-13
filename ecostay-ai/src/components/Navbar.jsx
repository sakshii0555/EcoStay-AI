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

  // =====================================================
  // MOBILE MENU
  // =====================================================

  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // APPLY THEME
  // =====================================================

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
  // CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
  // =====================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    alert("Logged out successfully!");

    navigate("/login");
  };

  // =====================================================
  // CLOSE MENU AFTER CLICKING A LINK
  // =====================================================

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // =====================================================
  // NAVBAR
  // =====================================================

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-black/40
        dark:bg-gray-950/95
        backdrop-blur-md
        text-white
        shadow-lg
        transition-colors
        duration-300
      "
    >

      {/* =================================================
          MAIN NAVBAR
      ================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          py-3
          md:py-4
          flex
          items-center
          justify-between
        "
      >

        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={handleLinkClick}
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


        {/* =================================================
            DESKTOP NAVIGATION
            hidden on mobile
        ================================================== */}

        <div
          className="
            hidden
            md:flex
            items-center
            gap-5
            lg:gap-6
            text-base
            lg:text-lg
          "
        >

          {/* HOME */}

          <Link
            to="/"
            className="
              hover:text-green-400
              transition
              whitespace-nowrap
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
              whitespace-nowrap
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
                whitespace-nowrap
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
                whitespace-nowrap
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
              whitespace-nowrap
            "
          >
            AI Planner
          </Link>


          {/* =================================================
              DARK / LIGHT MODE
          ================================================== */}

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
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
              shrink-0
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
                  whitespace-nowrap
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
                  whitespace-nowrap
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
                whitespace-nowrap
              "
            >
              Logout
            </button>

          )}

        </div>


        {/* =================================================
            MOBILE CONTROLS
        ================================================== */}

        <div
          className="
            flex
            md:hidden
            items-center
            gap-2
          "
        >

          {/* DARK / LIGHT MODE */}

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            title={
              darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              text-lg
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


          {/* HAMBURGER */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="
              w-10
              h-10
              rounded-lg
              flex
              flex-col
              items-center
              justify-center
              gap-1.5
              bg-white/10
              hover:bg-white/20
              border
              border-white/20
              transition
            "
          >

            <span
              className={`
                block
                w-5
                h-0.5
                bg-white
                rounded
                transition
                duration-300
                ${
                  menuOpen
                    ? "rotate-45 translate-y-2"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                w-5
                h-0.5
                bg-white
                rounded
                transition
                duration-300
                ${
                  menuOpen
                    ? "opacity-0"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                w-5
                h-0.5
                bg-white
                rounded
                transition
                duration-300
                ${
                  menuOpen
                    ? "-rotate-45 -translate-y-2"
                    : ""
                }
              `}
            />

          </button>

        </div>

      </div>


      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {menuOpen && (

        <div
          className="
            md:hidden
            border-t
            border-white/10
            bg-black/90
            dark:bg-gray-950/98
            backdrop-blur-xl
            shadow-xl
          "
        >

          <div
            className="
              px-5
              py-5
              flex
              flex-col
              gap-1
            "
          >

            {/* HOME */}

            <Link
              to="/"
              onClick={handleLinkClick}
              className="
                px-4
                py-3
                rounded-lg
                text-base
                hover:bg-white/10
                hover:text-green-400
                transition
              "
            >
              Home
            </Link>


            {/* ABOUT */}

            <Link
              to="/about"
              onClick={handleLinkClick}
              className="
                px-4
                py-3
                rounded-lg
                text-base
                hover:bg-white/10
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
                onClick={handleLinkClick}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-base
                  hover:bg-white/10
                  hover:text-green-400
                  transition
                "
              >
                Dashboard
              </Link>
            )}


            {/* MY PROFILE */}

            {token && (
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-base
                  hover:bg-white/10
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
              onClick={handleLinkClick}
              className="
                px-4
                py-3
                rounded-lg
                text-base
                hover:bg-white/10
                hover:text-green-400
                transition
              "
            >
              AI Planner
            </Link>


            {/* SEPARATOR */}

            <div
              className="
                h-px
                bg-white/10
                my-2
              "
            />


            {/* LOGIN / REGISTER */}

            {!token ? (
              <div
                className="
                  flex
                  flex-col
                  gap-2
                "
              >

                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    border
                    border-green-500
                    text-green-400
                    text-center
                    hover:bg-green-600
                    hover:text-white
                    transition
                  "
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    text-center
                    transition
                  "
                >
                  Register
                </Link>

              </div>

            ) : (

              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full
                  px-4
                  py-3
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

      )}

    </nav>
  );
}

export default Navbar;