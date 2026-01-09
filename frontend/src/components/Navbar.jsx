import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn, userData, logout, sendVerificationOtp } =
    useAuthContext();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Liwoto<span className="text-emerald-500">Blogs</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[14px]">
          {isLoggedIn && (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/blogs">Blogs</NavLink>
              <NavLink to="/create-blog">Write</NavLink>
              <NavLink to="/saved-blogs">Saved</NavLink>
              <NavLink to="/my-blogs">My Blogs</NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                Hi, <span className="font-medium">{userData?.name}</span>
              </span>
              <div className="w-8 h-8 flex justify-center items-center bg-black text-white rounded-full relative group">
                {userData && userData.name[0].toUpperCase()}
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                  <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                    {userData && !userData.isAccountVerified && (
                      <li
                        onClick={() => {
                          sendVerificationOtp();
                          scrollTo(0, 0);
                        }}
                        className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                      >
                        Verify email
                      </li>
                    )}
                    <li
                      onClick={() => logout()}
                      className="py-1 px-2 hover:bg-gray-200 pr-10 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            {/* Links */}
            <div className="flex flex-col gap-4">
              <MobileLink to="/" onClick={() => setOpen(false)}>
                🏠 Home
              </MobileLink>
              <MobileLink to="/blogs" onClick={() => setOpen(false)}>
                📃 Blogs
              </MobileLink>

              {isLoggedIn && (
                <>
                  <MobileLink to="/create-blog" onClick={() => setOpen(false)}>
                    ✍️ Write Blog
                  </MobileLink>
                  <MobileLink to="/saved-blogs" onClick={() => setOpen(false)}>
                    💾 Saved Blogs
                  </MobileLink>
                  <MobileLink to="/my-blogs" onClick={() => setOpen(false)}>
                    📚 My Blogs
                  </MobileLink>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-4" />

            {/* Auth Section */}
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <MobileLink to="/login" onClick={() => setOpen(false)}>
                  Login
                </MobileLink>
                <Link
                  onClick={() => {
                    scrollTo(0, 0);
                    setOpen(false);
                  }}
                  to="/register"
                  className="w-full text-center py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Logged in as</p>
                  <p className="font-medium text-gray-800">{userData?.name}</p>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* Desktop Link */
const NavLink = ({ to, children }) => (
  <Link
    onClick={() => scrollTo(0, 0)}
    to={to}
    className="text-gray-600 hover:text-emerald-500 font-medium transition"
  >
    {children}
  </Link>
);

/* Mobile Link */
const MobileLink = ({ to, children, ...props }) => (
  <Link
    onClick={() => scrollTo(0, 0)}
    to={to}
    {...props}
    className="w-full py-3 px-4 rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
  >
    {children}
  </Link>
);
