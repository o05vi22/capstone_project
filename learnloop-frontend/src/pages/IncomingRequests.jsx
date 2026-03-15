import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function IncomingRequests() {

  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get(`/requests/incoming/${userId}`);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const acceptRequest = async (id) => {
    try {
      await api.put(`/requests/${id}/accept`);
      alert("Request accepted!");
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await api.put(`/requests/${id}/reject`);
      alert("Request rejected!");
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    page:{
      padding:"40px",
      fontFamily:"Arial"
    },
    title:{
      fontSize:"32px",
      fontWeight:"700",
      marginBottom:"20px"
    },
    card:{
      background:"#fff",
      padding:"20px",
      borderRadius:"10px",
      marginBottom:"15px",
      boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
    },
    buttons:{
      marginTop:"10px",
      display:"flex",
      gap:"10px"
    },
    accept:{
      padding:"8px 16px",
      border:"none",
      borderRadius:"6px",
      background:"#22c55e",
      color:"#fff",
      cursor:"pointer"
    },
    reject:{
      padding:"8px 16px",
      border:"none",
      borderRadius:"6px",
      background:"#ef4444",
      color:"#fff",
      cursor:"pointer"
    }
  };

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>Incoming Requests</h1>

      {requests.length === 0 && (
        <p>No requests yet.</p>
      )}

      {requests.map((req) => (
        <div key={req.id} style={styles.card}>

          <p>
            <b>User {req.senderName}</b> wants to learn <b>{req.skillName}</b>
          </p>

        <p>Status: {req.status}</p>

        {req.status === "ACCEPTED" && (
        <button
            style={styles.accept}
            onClick={() => navigate(`/learning/${req.skillName}`)}
        >
            Start Learning
        </button>
        )}

          {req.status === "PENDING" && (
            <div style={styles.buttons}>

              <button
                style={styles.accept}
                onClick={() => acceptRequest(req.id)}
              >
                Accept
              </button>

              <button
                style={styles.reject}
                onClick={() => rejectRequest(req.id)}
              >
                Reject
              </button>

            </div>
          )}

        </div>
      ))}

    </div>
  );
}