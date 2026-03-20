import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "./auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoggedIn()) return children;

  const goLogin = () => navigate("/login", { state: { from: location.pathname } });
  const goRegister = () => navigate("/register", { state: { from: location.pathname } });
  const goHome = () => navigate("/", { replace: true });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,25,40,0.35)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "min(720px,95vw)",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          fontFamily: "system-ui",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px",
            background: "linear-gradient(135deg,#5b5fc7,#7a7ee6)",
            color: "#f5f6ff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255,255,255,0.25)",
                display: "grid",
                placeItems: "center",
                fontWeight: "700",
              }}
            >
              LL
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: 18 }}>
                Login required
              </div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>
                Secure access to your dashboard & skills
              </div>
            </div>
          </div>

          <button
            onClick={goHome}
            style={{
              border: "none",
              background: "rgba(255,255,255,0.25)",
              color: "#fff",
              borderRadius: 12,
              width: 40,
              height: 40,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "26px" }}>
          <p
  style={{
    color: "#5c677d",
    fontSize: 17,
    lineHeight: 1.6,
    marginTop: 0,
    fontWeight: 500
  }}
>
  Please login to continue.
</p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 18,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={goLogin}
              style={{
                background: "#4f54c9",
                color: "#fff",
                border: "none",
                padding: "12px 26px",
                borderRadius: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Login
            </button>

            <button
              onClick={goRegister}
              style={{
                background: "#eef0ff",
                color: "#4f54c9",
                border: "1px solid #d6d8ff",
                padding: "12px 26px",
                borderRadius: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Register
            </button>

            <div style={{ flex: 1 }} />

            <button
              onClick={goHome}
              style={{
                background: "#f6f7fb",
                color: "#444",
                border: "1px solid #e3e4ea",
                padding: "12px 26px",
                borderRadius: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Go Home
            </button>
          </div>

          {/* Tip Box */}
          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 14,
              background: "#f7f8ff",
              border: "1px dashed #e2e4ff",
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            <b style={{ color: "#333" }}>Tip:</b> After login, you'll be
            redirected back to{" "}
            <span style={{ fontWeight: 600 }}>{location.pathname}</span>.
          </div>
        </div>
      </div>
    </div>
  );
}