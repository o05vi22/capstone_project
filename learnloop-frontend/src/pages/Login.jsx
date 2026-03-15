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

      // existing storage
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);

      // NEW → store user object for profile
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email
        })
      );

      localStorage.setItem("token", "logged_in");

      const redirectTo = location.state?.from || "/skills";
      nav(redirectTo);
    } catch (err) {
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

          <button className="btn btn-primary" type="submit">Login</button>
        </form>

        <p className="p" style={{ marginTop: 12 }}>
          New user?{" "}
          <Link to="/register" style={{ color: "var(--accent)", fontWeight: 700 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}