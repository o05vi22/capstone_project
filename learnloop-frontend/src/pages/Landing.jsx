import { Link, Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";
import Dashboard from "./Dashboard";

export default function Landing() {
  if (isLoggedIn()) return <Navigate to="/dashboard" replace />;

  return (
    <div className="container">
      <div className="hero">
        <div className="hero-inner">
          <div>
            <h1 className="h1">
              Connecting Skilled Talent <br /> with Industry
            </h1>

            <p className="p">
              LearnLoop is a skill exchange platform where you learn by swapping skills — no money.
              Build your profile, add skills you know/need, take assessments, and connect with learners.
            </p>

            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-wide">Get Started</Link>
              <Link to="/login" className="btn btn-soft btn-wide">Login</Link>
              <Link to="/dashboard" className="btn btn-outline btn-wide">Explore</Link>
            </div>

            <div className="kpi-row">
              <div className="kpi">
                <b>Register</b>
                <span>Create your profile</span>
              </div>
              <div className="kpi">
                <b>Add Skills</b>
                <span>Know + Need</span>
              </div>
              <div className="kpi">
                <b>Learn Together</b>
                <span>Send requests</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-shape" />
            <div className="hero-photo" />
          </div>
        </div>
      </div>

      {/* Explore learners section */}
      <div style={{ marginTop: 26 }}>
        <h2 className="section-title">Explore learners</h2>
        <Dashboard />
      </div>
    </div>
  );
}