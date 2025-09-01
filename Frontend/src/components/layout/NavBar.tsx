import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const userType = localStorage.getItem("userType");
  const accessToken = localStorage.getItem("accessToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">ServiceHub</h1>
            </div>
            <div className="hidden md:block ml-8">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  About
                </Link>
                {accessToken && userType === "provider" && (
                  <Link
                    to="/providerDashBoard"
                    className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Provider DashBoard
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          {!accessToken && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button - Only hamburger icon, no login/signup buttons */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
            <Link
              to="/"
              className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {accessToken && userType === "provider" && (
              <Link
                to="/providerDashBoard"
                className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Provider DashBoard
              </Link>
            )}
            
            {/* Mobile Auth Buttons (visible only when logged out) */}
            {!accessToken && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="w-full text-center bg-gray-200 text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;