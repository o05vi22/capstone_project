import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // SAFE EXTRACTION
      const userData = res.data;

      if (!userData || !userData.name) {
        alert("Invalid login response");
        return;
      }

      // STORE DATA - FIXED: Store name in multiple places for redundancy
      localStorage.setItem("name", userData.name); // Primary
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userName", userData.name); // Secondary
      localStorage.setItem("userEmail", userData.email);

      // Also store full user object
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          id: userData.id
        })
      );

      localStorage.setItem("token", "logged_in");

      console.log("LOGIN SUCCESS - Stored name:", userData.name);

      const redirectTo = location.state?.from || "/skills";
      nav(redirectTo);
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card card-pad form-card">
        <h2 className="section-title" style={{ marginBottom: 6 }}>Login</h2>
        <p className="p">Welcome back. Continue your learning journey.</p>

        <form onSubmit={submit} className="form">
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="p" style={{ marginTop: 12 }}>
          New user?{" "}
          <Link
            to="/register"
            style={{ color: "var(--accent)", fontWeight: 700 }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}