import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminDashboard() {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h1>Welcome Admin 👑</h1>
      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          cursor: "pointer",
          marginTop: "20px",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
