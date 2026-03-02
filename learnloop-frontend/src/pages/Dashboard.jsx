import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const currentUserId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    api.get(`/dashboard/users?currentUserId=${currentUserId}`)
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {users.map((u) => (
            <div key={u.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
              <h3 style={{ margin: 0 }}>{u.name}</h3>
              <p style={{ marginTop: 6, opacity: 0.7 }}>{u.email}</p>

              <div style={{ marginTop: 10 }}>
                <b>Know:</b>
                <ul>
                  {(u.knowSkills || []).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div style={{ marginTop: 10 }}>
                <b>Need:</b>
                <ul>
                  {(u.needSkills || []).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <button style={{ marginTop: 10 }}>
                Request to Learn from You
              </button>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}