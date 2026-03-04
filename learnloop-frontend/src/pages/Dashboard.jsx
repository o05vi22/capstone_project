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
    <div className="container" style={{ paddingTop: 0 }}>
      {users.length === 0 ? (
        <div className="card card-pad">
          <b>No users found</b>
          <p className="p" style={{ marginTop: 8 }}>Try again later.</p>
        </div>
      ) : (
        <div className="grid">
          {users.map((u) => (
            <div key={u.id} className="card card-pad user-card">
              <h3>{u.name}</h3>
              <p className="small">{u.email}</p>

              <div className="skill-cols">
                <div className="skill-box">
                  <b>Know</b>
                  <ul className="skill-list">
                    {(u.knowSkills || []).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="skill-box">
                  <b>Need</b>
                  <ul className="skill-list">
                    {(u.needSkills || []).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <button className="btn btn-primary" style={{ marginTop: 14, width: "100%" }}>
                Request to Learn from You
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}