import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@email.com",
  };

  const selectedSkill = localStorage.getItem("selectedSkill") || "No skill selected";
  const score = localStorage.getItem("score") || "No score available";
  const totalQuestions = localStorage.getItem("totalQuestions") || "0";

  const phone = localStorage.getItem("phone") || "Not added";
  const college = localStorage.getItem("college") || "Not added";
  const department = localStorage.getItem("department") || "Not added";
  const bio = localStorage.getItem("bio") || "Not added";
  const skillsKnown = localStorage.getItem("skillsKnown") || "Not added";
  const skillsNeed = localStorage.getItem("skillsNeed") || "Not added";

  let status = "Not Attempted";
  if (score !== "No score available" && totalQuestions !== "0") {
    const percentage = (parseInt(score) / parseInt(totalQuestions)) * 100;
    status = percentage >= 50 ? "Passed" : "Needs Improvement";
  }

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
      background: "#f5f7fb",
      fontFamily: "Arial, sans-serif",
    },
    navbar: {
      height: "84px",
      background: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
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
      width: "56px",
      height: "56px",
      borderRadius: "16px",
      background: "#27216b",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: "700",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a",
      margin: 0,
    },
    center: {
      display: "flex",
      gap: "30px",
      alignItems: "center",
    },
    navItem: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#64748b",
      cursor: "pointer",
    },
    profileMenu: {
      position: "relative",
    },
    profileTrigger: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#fff",
      border: "1px solid #dbe1ea",
      borderRadius: "999px",
      padding: "8px 14px",
      cursor: "pointer",
    },
    avatar: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "#27216b",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "700",
    },
    profileName: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#0f172a",
    },
    dropdown: {
      position: "absolute",
      top: "60px",
      right: 0,
      width: "180px",
      background: "#fff",
      borderRadius: "14px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
      overflow: "hidden",
      zIndex: 1001,
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
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    hero: {
      background: "linear-gradient(135deg, #27216b, #5145cd)",
      borderRadius: "24px",
      padding: "30px",
      color: "#fff",
      marginBottom: "28px",
      boxShadow: "0 10px 24px rgba(39,33,107,0.18)",
    },
    heroRow: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
    },
    heroAvatar: {
      width: "74px",
      height: "74px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      border: "2px solid rgba(255,255,255,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
      fontWeight: "700",
    },
    heroTitle: {
      margin: "0 0 6px 0",
      fontSize: "34px",
      fontWeight: "700",
    },
    heroText: {
      margin: 0,
      fontSize: "17px",
      opacity: 0.95,
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#16213e",
      margin: "10px 0 18px 0",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "22px",
      marginBottom: "22px",
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
      border: "1px solid #eef2f7",
      minHeight: "120px",
    },
    wideCard: {
      gridColumn: "span 3",
      background: "#fff",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
      border: "1px solid #eef2f7",
    },
    cardTitle: {
      margin: "0 0 12px 0",
      fontSize: "22px",
      fontWeight: "700",
      color: "#16213e",
    },
    cardText: {
      margin: 0,
      fontSize: "16px",
      color: "#64748b",
      lineHeight: 1.5,
      wordBreak: "break-word",
    },
    buttonRow: {
      display: "flex",
      gap: "14px",
      marginTop: "10px",
    },
    primaryBtn: {
      padding: "12px 22px",
      border: "none",
      borderRadius: "10px",
      background: "#27216b",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
    },
    secondaryBtn: {
      padding: "12px 22px",
      border: "none",
      borderRadius: "10px",
      background: "#ff8c42",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
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
              <div style={styles.dropdownItem} onClick={() => navigate("/edit-profile")}>
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
          <div style={styles.heroRow}>
            <div style={styles.heroAvatar}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 style={styles.heroTitle}>{user.name}</h1>
              <p style={styles.heroText}>{user.email}</p>
            </div>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Learning Information</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Selected Skill</h3>
            <p style={styles.cardText}>{selectedSkill}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Latest Score</h3>
            <p style={styles.cardText}>{score} / {totalQuestions}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Status</h3>
            <p style={styles.cardText}>{status}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Skills Known</h3>
            <p style={styles.cardText}>{skillsKnown}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Skills Need</h3>
            <p style={styles.cardText}>{skillsNeed}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Department</h3>
            <p style={styles.cardText}>{department}</p>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Personal Information</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Phone</h3>
            <p style={styles.cardText}>{phone}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>College</h3>
            <p style={styles.cardText}>{college}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Email</h3>
            <p style={styles.cardText}>{user.email}</p>
          </div>

          <div style={styles.wideCard}>
            <h3 style={styles.cardTitle}>Bio</h3>
            <p style={styles.cardText}>{bio}</p>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.primaryBtn} onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}