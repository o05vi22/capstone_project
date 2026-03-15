import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@email.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    navigate("/");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f8fbff 0%, #eef3f9 100%)",
      fontFamily: "Arial, sans-serif",
      color: "#0f172a",
    },
    navbar: {
      height: "86px",
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #e6edf5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 42px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    left: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },
    logoBox: {
      width: "54px",
      height: "54px",
      borderRadius: "18px",
      background: "linear-gradient(135deg, #241d6b, #5145cd)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: "700",
      boxShadow: "0 10px 22px rgba(81,69,205,0.25)",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "800",
      color: "#0f172a",
      margin: 0,
      letterSpacing: "0.2px",
    },
    center: {
      display: "flex",
      gap: "28px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    navItem: {
      fontSize: "17px",
      fontWeight: "600",
      color: "#5f6f86",
      cursor: "pointer",
      transition: "0.2s ease",
    },
    profileMenu: {
      position: "relative",
    },
    profileTrigger: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: "#ffffff",
      border: "1px solid #dbe4ef",
      borderRadius: "999px",
      padding: "8px 14px",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(15,23,42,0.04)",
    },
    avatar: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #241d6b, #5145cd)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "700",
    },
    profileName: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#0f172a",
    },
    dropdown: {
      position: "absolute",
      top: "62px",
      right: 0,
      width: "190px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 16px 40px rgba(15,23,42,0.14)",
      overflow: "hidden",
      zIndex: 1001,
      border: "1px solid #eef2f7",
    },
    dropdownItem: {
      padding: "14px 16px",
      fontSize: "15px",
      cursor: "pointer",
      color: "#1e293b",
      borderBottom: "1px solid #f1f5f9",
      background: "#fff",
    },
    content: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "34px 24px 60px",
    },
    hero: {
      background:
        "linear-gradient(135deg, #241d6b 0%, #3d33a3 45%, #5d54df 100%)",
      borderRadius: "30px",
      padding: "40px",
      color: "#fff",
      marginBottom: "30px",
      boxShadow: "0 20px 45px rgba(49,39,145,0.25)",
      position: "relative",
      overflow: "hidden",
    },
    heroGlow: {
      position: "absolute",
      width: "260px",
      height: "260px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.08)",
      top: "-70px",
      right: "-40px",
    },
    heroRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
      position: "relative",
      zIndex: 1,
    },
    heroLeft: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    heroAvatar: {
      width: "82px",
      height: "82px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      border: "2px solid rgba(255,255,255,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      fontWeight: "700",
      backdropFilter: "blur(6px)",
    },
    heroTitle: {
      margin: "0 0 8px 0",
      fontSize: "42px",
      fontWeight: "800",
      lineHeight: 1.1,
    },
    heroText: {
      margin: 0,
      fontSize: "18px",
      opacity: 0.95,
    },
    heroActions: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    heroPrimaryBtn: {
      padding: "13px 22px",
      border: "none",
      borderRadius: "12px",
      background: "#ffffff",
      color: "#241d6b",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },
    heroSecondaryBtn: {
      padding: "13px 22px",
      border: "1px solid rgba(255,255,255,0.35)",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.08)",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      alignItems: "start",
    },
    section: {
      background: "#ffffff",
      borderRadius: "24px",
      padding: "30px",
      boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
      border: "1px solid #edf2f7",
      marginBottom: "24px",
    },
    sectionTitle: {
      margin: "0 0 16px 0",
      fontSize: "32px",
      fontWeight: "800",
      color: "#0f172a",
    },
    paragraph: {
      margin: "0 0 16px 0",
      fontSize: "17px",
      color: "#526277",
      lineHeight: 1.9,
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "18px",
      marginTop: "22px",
    },
    featureCard: {
      background: "linear-gradient(180deg, #f8fbff 0%, #f3f7fc 100%)",
      border: "1px solid #e2eaf3",
      borderRadius: "20px",
      padding: "22px",
      transition: "0.2s ease",
    },
    featureNumber: {
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: "#e9e7ff",
      color: "#3d33a3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "800",
      marginBottom: "14px",
      fontSize: "15px",
    },
    featureTitle: {
      margin: "0 0 10px 0",
      fontSize: "24px",
      fontWeight: "800",
      color: "#16213e",
      lineHeight: 1.2,
    },
    featureText: {
      margin: 0,
      fontSize: "15px",
      color: "#64748b",
      lineHeight: 1.7,
    },
    sidebarCard: {
      background: "#ffffff",
      borderRadius: "24px",
      padding: "26px",
      boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
      border: "1px solid #edf2f7",
      marginBottom: "24px",
    },
    badge: {
      display: "inline-block",
      padding: "8px 12px",
      borderRadius: "999px",
      background: "#eef2ff",
      color: "#4338ca",
      fontSize: "13px",
      fontWeight: "700",
      marginBottom: "14px",
    },
    miniTitle: {
      margin: "0 0 12px 0",
      fontSize: "26px",
      fontWeight: "800",
      color: "#16213e",
    },
    list: {
      paddingLeft: "18px",
      margin: "10px 0 0 0",
      color: "#5b6b80",
      lineHeight: 1.9,
      fontSize: "15px",
    },
    ctaBox: {
      background: "linear-gradient(135deg, #fff7ed, #fff1e6)",
      border: "1px solid #fed7aa",
      borderRadius: "20px",
      padding: "22px",
      marginTop: "18px",
    },
    ctaBtn: {
      marginTop: "14px",
      padding: "12px 18px",
      border: "none",
      borderRadius: "12px",
      background: "#f97316",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.left}>
          <div style={styles.logoBox}>LL</div>
          <h2 style={styles.logoText}>LearnLoop</h2>
        </div>

        <div style={styles.center}>
          <span style={styles.navItem} onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span style={styles.navItem} onClick={() => navigate("/skills")}>
            Skills
          </span>
          <span style={styles.navItem} onClick={() => navigate("/assessment")}>
            Assessment
          </span>
          <span style={styles.navItem} onClick={() => navigate("/result")}>
            Result
          </span>
          <span style={styles.navItem} onClick={() => navigate("/explore-users")}>
            Explore Users
          </span>
          <span style={styles.navItem} onClick={() => navigate("/profile")}>
            My Profile
          </span>
        </div>

        <div style={styles.profileMenu}>
          <div
            style={styles.profileTrigger}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div style={styles.avatar}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span style={styles.profileName}>{user.name}</span>
          </div>

          {showDropdown && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem} onClick={() => navigate("/profile")}>
                My Profile
              </div>
              <div
                style={styles.dropdownItem}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </div>
              <div style={styles.dropdownItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.hero}>
          <div style={styles.heroGlow}></div>

          <div style={styles.heroRow}>
            <div style={styles.heroLeft}>
              <div style={styles.heroAvatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h1 style={styles.heroTitle}>Welcome, {user.name}</h1>
                <p style={styles.heroText}>{user.email}</p>
              </div>
            </div>

            <div style={styles.heroActions}>
              <button
                style={styles.heroPrimaryBtn}
                onClick={() => navigate("/explore-users")}
              >
                Explore Users
              </button>
              <button
                style={styles.heroSecondaryBtn}
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        <div style={styles.grid}>
          <div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>About LearnLoop</h2>
              <p style={styles.paragraph}>
                LearnLoop is a peer-to-peer skill sharing platform designed to
                connect learners with people who already have knowledge in a
                particular skill. The platform encourages collaborative learning,
                meaningful interaction, and practical knowledge exchange.
              </p>
              <p style={styles.paragraph}>
                Users can create their profile, explore other users, identify
                what skills they know and what skills they need, attend
                assessments, and track their progress in one simple system. The
                aim is to build a smart, interactive, and student-friendly
                learning community.
              </p>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Core Features</h2>

              <div style={styles.featuresGrid}>
                <div style={styles.featureCard}>
                  <div style={styles.featureNumber}>01</div>
                  <h3 style={styles.featureTitle}>Secure Login</h3>
                  <p style={styles.featureText}>
                    Users can register and log in safely to access their
                    dashboard and learning activities.
                  </p>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureNumber}>02</div>
                  <h3 style={styles.featureTitle}>Profile Management</h3>
                  <p style={styles.featureText}>
                    Users can update personal details, skills known, skills
                    needed, bio, and academic information.
                  </p>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureNumber}>03</div>
                  <h3 style={styles.featureTitle}>Explore Users</h3>
                  <p style={styles.featureText}>
                    Browse other users, view their interests, and connect based
                    on learning needs and expertise.
                  </p>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureNumber}>04</div>
                  <h3 style={styles.featureTitle}>Assessments</h3>
                  <p style={styles.featureText}>
                    Test knowledge in selected skills and evaluate learning
                    progress through simple assessments.
                  </p>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureNumber}>05</div>
                  <h3 style={styles.featureTitle}>Result Tracking</h3>
                  <p style={styles.featureText}>
                    Check scores and review performance to understand progress
                    clearly.
                  </p>
                </div>

                <div style={styles.featureCard}>
                  <div style={styles.featureNumber}>06</div>
                  <h3 style={styles.featureTitle}>Skill Exchange</h3>
                  <p style={styles.featureText}>
                    Build a collaborative environment where users can learn from
                    one another through shared knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={styles.sidebarCard}>
              <div style={styles.badge}>Platform Highlights</div>
              <h3 style={styles.miniTitle}>Why LearnLoop?</h3>
              <ul style={styles.list}>
                <li>Simple and modern user experience</li>
                <li>Peer-to-peer learning support</li>
                <li>Skill-focused assessments</li>
                <li>Personalized profile management</li>
                <li>Interactive user discovery</li>
              </ul>
            </div>

            <div style={styles.sidebarCard}>
              <div style={styles.badge}>Quick Access</div>
              <h3 style={styles.miniTitle}>Get Started</h3>
              <p style={styles.featureText}>
                Update your profile, set your skills, explore users, and begin
                learning with the community.
              </p>

              <div style={styles.ctaBox}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", color: "#16213e" }}>
                  Complete Your Profile
                </h3>
                <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.7 }}>
                  Add your skills and details to make your profile more useful
                  for collaboration.
                </p>
                <button
                  style={styles.ctaBtn}
                  onClick={() => navigate("/edit-profile")}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}