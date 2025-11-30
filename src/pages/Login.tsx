import { useState, useEffect, FormEvent } from "react";
import { signInWithEmailAndPassword, AuthError, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // ✅ no .ts extension
import { useNavigate } from "react-router-dom";

// Email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to get user-friendly error messages
const getErrorMessage = (error: AuthError): string => {
  const errorCode = error.code;

  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/user-not-found":
      return "No account found with this email address";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later";
    case "auth/network-request-failed":
      return "Network error. Please check your connection";
    default:
      return "Login failed. Please try again";
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ New state: to check if user is already logged in
  const [checkingAuth, setCheckingAuth] = useState(true);

  const navigate = useNavigate();

  // ✅ If user is already logged in, redirect away from /login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Already logged in → go to admin
        navigate("/admin", { replace: true });
      } else {
        // Not logged in → show login form
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g., example@domain.com)");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      navigate("/admin", { replace: true }); // ✅ prevent back to login
    } catch (err) {
      const firebaseError = err as AuthError;
      console.error("Login error:", firebaseError);
      setError(getErrorMessage(firebaseError));
    } finally {
      setLoading(false);
    }
  };

  // ✅ While checking if already logged in, don't flash the form
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900">
        <p className="text-white text-lg">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900">
      <div className="bg-white rounded-2xl shadow-2xl w-[360px] p-8 animate-fadeIn">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Login
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Please login to access the dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email (e.g., userpreview@gmail.com)"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition transform hover:scale-[1.02] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
