import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function ExploreUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const filteredUsers = res.data.filter(
        (user) => String(user.id) !== String(currentUserId)
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    title: {
      fontSize: "38px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "24px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "22px",
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
      border: "1px solid #eef2f7",
    },
    avatar: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      background: "#27216b",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "26px",
      fontWeight: "700",
      marginBottom: "14px",
    },
    name: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#16213e",
      margin: "0 0 8px 0",
    },
    email: {
      fontSize: "16px",
      color: "#64748b",
      marginBottom: "18px",
    },
    label: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#16213e",
      marginTop: "10px",
      marginBottom: "8px",
    },
    text: {
      fontSize: "16px",
      color: "#64748b",
      lineHeight: 1.5,
    },
    buttonRow: {
      display: "flex",
      gap: "12px",
      marginTop: "20px",
    },
    viewBtn: {
      flex: 1,
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      background: "#27216b",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
    },
    requestBtn: {
      flex: 1,
      padding: "12px",
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
          <span style={styles.navItem} onClick={() => navigate("/explore-users")}>
            Explore Users
          </span>
          <span style={styles.navItem} onClick={() => navigate("/profile")}>
            Profile
          </span>
        </div>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.title}>Explore Users</h1>

        <div style={styles.grid}>
          {users.map((user) => (
            <div key={user.id} style={styles.card}>
              <div style={styles.avatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 style={styles.name}>{user.name}</h2>
              <p style={styles.email}>{user.email}</p>

              <h3 style={styles.label}>Skills Known</h3>
              <p style={styles.text}>{user.skillsKnown || "Not added"}</p>

              <h3 style={styles.label}>Skills Need</h3>
              <p style={styles.text}>{user.skillsNeed || "Not added"}</p>

              <div style={styles.buttonRow}>
                <button
                  style={styles.viewBtn}
                  onClick={() => navigate(`/user-profile/${user.id}`)}
                >
                  View Profile
                </button>

                <button
                  style={styles.requestBtn}
                  onClick={() => alert(`Request sent to ${user.name}`)}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}