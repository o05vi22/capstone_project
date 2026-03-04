import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "./auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoggedIn()) return children;

  // ✅ Popup modal UI
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "min(520px, 95vw)",
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Login required</h2>
        <p style={{ marginTop: 8, opacity: 0.85 }}>
          You tried to open <b>{location.pathname}</b>. Please login or register to continue.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register", { state: { from: location.pathname } })}
          >
            Register
          </button>

          <button
            onClick={() => navigate("/", { replace: true })}
            style={{ marginLeft: "auto" }}
          >
            Go Home
          </button>
        </div>

        <div style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
          Tip: After login, you can automatically redirect back to <b>{location.pathname}</b>.
        </div>
      </div>
    </div>
  );
}