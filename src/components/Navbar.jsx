import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white!">
          Memories
        </Link>

        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Link
                to="/memories/profile"
                className="hover:text-indigo-200 transition text-white!"
              >
                My Memory
              </Link>
              <button
                onClick={logout}
                className="bg-[#1a1a1a] text-white! px-4 py-1 rounded-md "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white! transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#1a1a1a] text-white! px-4 py-1 rounded-md  transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
