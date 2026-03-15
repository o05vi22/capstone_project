import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";

export default function Navbar() {
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav("/");
  };

  return (
    <div className="navbar">
      <div className="nav-inner">

        <Link to="/" className="brand">
          <div className="brand-badge">LL</div>
          <div>LearnLoop</div>
        </Link>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-actions">
          {isLoggedIn() ? (
            <button className="btn btn-outline" onClick={doLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}