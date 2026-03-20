import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
  };

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [college, setCollege] = useState(localStorage.getItem("college") || "");
  const [department, setDepartment] = useState(localStorage.getItem("department") || "");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [skillsKnown, setSkillsKnown] = useState(localStorage.getItem("skillsKnown") || "");
  const [skillsNeed, setSkillsNeed] = useState(localStorage.getItem("skillsNeed") || "");

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
      })
    );

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("college", college);
    localStorage.setItem("department", department);
    localStorage.setItem("bio", bio);
    localStorage.setItem("skillsKnown", skillsKnown);
    localStorage.setItem("skillsNeed", skillsNeed);

    alert("Profile updated successfully!");
    navigate("/profile");
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
    content: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "24px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "24px",
      padding: "30px",
      boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
      border: "1px solid #eef2f7",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#16213e",
      marginBottom: "18px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "18px",
      marginBottom: "20px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#334155",
    },
    input: {
      padding: "14px 16px",
      borderRadius: "12px",
      border: "1px solid #dbe1ea",
      fontSize: "15px",
      outline: "none",
      background: "#f8fafc",
    },
    textarea: {
      padding: "14px 16px",
      borderRadius: "12px",
      border: "1px solid #dbe1ea",
      fontSize: "15px",
      outline: "none",
      background: "#f8fafc",
      minHeight: "110px",
      resize: "vertical",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    buttonRow: {
      display: "flex",
      gap: "14px",
      marginTop: "26px",
    },
    saveBtn: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "10px",
      background: "#27216b",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
    },
    cancelBtn: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "10px",
      background: "#ff8c42",
      color: "#fff",
      fontSize: "16px",
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
          <span style={styles.navItem} onClick={() => navigate("/profile")}>
            Profile
          </span>
        </div>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>Edit Profile</h1>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone</label>
              <input
                style={styles.input}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>College</label>
              <input
                style={styles.input}
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter your college name"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Department</label>
              <input
                style={styles.input}
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter your department"
              />
            </div>

            <div style={{ ...styles.field, ...styles.fullWidth }}>
              <label style={styles.label}>Bio</label>
              <textarea
                style={styles.textarea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short bio about yourself"
              />
            </div>
          </div>

          <h2 style={styles.sectionTitle}>Learning Information</h2>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Skills Known</label>
              <input
                style={styles.input}
                type="text"
                value={skillsKnown}
                onChange={(e) => setSkillsKnown(e.target.value)}
                placeholder="Example: Java, Python, React"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Skills Need</label>
              <input
                style={styles.input}
                type="text"
                value={skillsNeed}
                onChange={(e) => setSkillsNeed(e.target.value)}
                placeholder="Example: Spring Boot, UI Design"
              />
            </div>
          </div>

          <div style={styles.buttonRow}>
            <button style={styles.saveBtn} onClick={handleSave}>
              Save Profile
            </button>
            <button
              style={styles.cancelBtn}
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}