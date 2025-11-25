import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../firebase.ts";
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
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    // Validation
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
      navigate("/admin");
    } catch (err) {
      const firebaseError = err as AuthError;
      console.error("Login error:", firebaseError);
      setError(getErrorMessage(firebaseError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "350px", margin: "100px auto", textAlign: "center" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email (e.g., admin@example.com)"
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            padding: "10px", 
            marginTop: "10px", 
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ddd",
            borderRadius: "4px"
          }}
          autoComplete="email"
          disabled={loading}
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            padding: "10px", 
            marginTop: "10px", 
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ddd",
            borderRadius: "4px"
          }}
          autoComplete="current-password"
          disabled={loading}
        />

        {error && (
          <p style={{ 
            color: "#d32f2f", 
            marginTop: "10px",
            fontSize: "14px",
            textAlign: "left",
            padding: "8px",
            backgroundColor: "#ffebee",
            borderRadius: "4px",
            border: "1px solid #ffcdd2"
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: loading ? "#999" : "black",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            borderRadius: "4px",
            border: "none",
            fontWeight: "bold",
            transition: "background 0.3s"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
