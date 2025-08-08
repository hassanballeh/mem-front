import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import MemoriesList from "./components/Memory/MemoriesList";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import MemoryDetail from "./components/Memory/MemoryDetail";
import "./index.css";
import Mymemory from "./components/Memory/Mymemory";
import { isTokenExpired } from "./services/api";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  }, []);

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<MemoriesList />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" replace /> : <Register />}
          />
          <Route path="/memories/:id" element={<MemoryDetail />} />
          <Route path="/memories/profile" element={<Mymemory />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrap App component with Router
function Main() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default Main;
