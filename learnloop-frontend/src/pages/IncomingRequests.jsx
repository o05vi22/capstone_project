import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function IncomingRequests() {
  const navigate = useNavigate();
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);
  const userId = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("name"); // Get current user name

  useEffect(() => {
    fetchIncoming();
    fetchSent();
  }, []);

  const fetchIncoming = async () => {
    try {
      const res = await api.get(`/requests/incoming/${userId}`);
      setIncoming(res.data);
    } catch (err) {
      console.error("Incoming error:", err);
    }
  };

  const fetchSent = async () => {
    try {
      const res = await api.get(`/requests/learning/sent/${userId}`);
      setSent(res.data);
    } catch (err) {
      console.error("Sent error:", err);
    }
  };

  const acceptRequest = async (id) => {
    await api.put(`/requests/${id}/accept`);
    fetchIncoming();
    fetchSent();
  };

  const rejectRequest = async (id) => {
    await api.put(`/requests/${id}/reject`);
    fetchIncoming();
  };

  const handleStartLearning = (req, isSender) => {
    // FIXED: Determine peer name correctly
    let peerName = "";
    
    if (isSender) {
      // If I'm the sender (Sarwesh), peer is the receiver (Oviya)
      peerName = req.receiverName;
      console.log("I'm the sender, peer is receiver:", peerName);
    } else {
      // If I'm the receiver (Oviya), peer is the sender (Sarwesh)
      peerName = req.senderName;
      console.log("I'm the receiver, peer is sender:", peerName);
    }
    
    console.log("Starting learning session:", {
      currentUser: currentUserName,
      peer: peerName,
      skill: req.skillName,
      isSender: isSender
    });

    // CRITICAL: Store peer name in localStorage BEFORE navigation
    localStorage.setItem("peerName", peerName);
    localStorage.setItem("currentSkill", req.skillName);
    localStorage.setItem("currentUserName", currentUserName); // Store current user too
    
    // Navigate to learning module with state
    navigate(`/learning/${req.skillName}`, {
      state: { 
        peer: peerName,
        skill: req.skillName,
        isSender: isSender
      }
    });
  };

  // Rest of your component remains the same...
  const styles = {
    page: { padding: "40px", fontFamily: "Arial" },
    title: { fontSize: "30px", fontWeight: "700", marginBottom: "20px" },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
    },
    buttons: { marginTop: "10px", display: "flex", gap: "10px" },
    accept: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      background: "#22c55e",
      color: "#fff",
      cursor: "pointer"
    },
    reject: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      background: "#ef4444",
      color: "#fff",
      cursor: "pointer"
    },
    start: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      background: "#4f46e5",
      color: "#fff",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Incoming Requests</h1>

      {incoming.length === 0 && <p>No incoming requests</p>}

      {incoming.map(req => (
        <div key={req.id} style={styles.card}>
          <p>
            <b>{req.senderName}</b> wants to learn <b>{req.skillName}</b>
          </p>
          <p>Status: {req.status}</p>

          {req.status === "PENDING" && (
            <div style={styles.buttons}>
              <button style={styles.accept} onClick={() => acceptRequest(req.id)}>
                Accept
              </button>
              <button style={styles.reject} onClick={() => rejectRequest(req.id)}>
                Reject
              </button>
            </div>
          )}

          {req.status === "ACCEPTED" && (
            <button
              style={styles.start}
              onClick={() => handleStartLearning(req, false)} // false = I'm the receiver
            >
              Start Learning
            </button>
          )}
        </div>
      ))}

      <h1 style={{ ...styles.title, marginTop: "40px" }}>
        Requests You Sent
      </h1>

      {sent.length === 0 && <p>No sent requests</p>}

      {sent.map(req => (
        <div key={req.id} style={styles.card}>
          <p>
            Request to <b>{req.receiverName}</b> for <b>{req.skillName}</b>
          </p>
          <p>Status: {req.status}</p>

          {req.status === "ACCEPTED" && (
            <button
              style={styles.start}
              onClick={() => handleStartLearning(req, true)} // true = I'm the sender
            >
              Start Learning
            </button>
          )}
        </div>
      ))}
    </div>
  );
}