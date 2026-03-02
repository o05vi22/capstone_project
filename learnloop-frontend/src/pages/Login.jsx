import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);

      // ✅ Simple flow: always go to skills first
      nav("/skills");
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 450, margin: "0 auto" }}>
      <h2>Login</h2>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: 12 }}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}