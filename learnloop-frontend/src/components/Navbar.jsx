import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";

export default function Navbar() {
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav("/");
  };

  return (
    <div style={{ padding: 12, borderBottom: "1px solid #ddd", display: "flex", gap: 12 }}>
      <Link to="/"><b>LearnLoop</b></Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/skills">Skills</Link>

      <div style={{ marginLeft: "auto" }}>
        {isLoggedIn() ? <button onClick={doLogout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </div>
  );
}