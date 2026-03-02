import { Link, Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

export default function Landing() {
  if (isLoggedIn()) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "0 auto" }}>
      <h1>Welcome to LearnLoop</h1>
      <p>
        A skill exchange platform where you learn by swapping skills — no money.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <Link to="/register"><button>Register</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/dashboard"><button>Explore</button></Link>
      </div>

      <div style={{ marginTop: 25, opacity: 0.8 }}>
        <p>Flow: Register/Login → Add Skills → Find users → Send request → Learn together</p>
      </div>
    </div>
  );
}