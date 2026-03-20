import { useEffect, useState } from "react";
import { api } from "../api";

export default function Requests() {
  const userId = Number(localStorage.getItem("userId")) || 1;
api.get(`/requests/inbox/${userId}`)
  const [requests, setRequests] = useState([]);

  const loadInbox = async () => {
    try {
      const res = await api.get(`/requests/inbox/${userId}`);
      setRequests(res.data);
    } catch {
      alert("Failed to load requests");
    }
  };

  useEffect(() => {
    loadInbox();
  }, []);

  const accept = async (id) => {
    await api.post(`/requests/${id}/accept`);
    loadInbox();
  };

  const reject = async (id) => {
    await api.post(`/requests/${id}/reject`);
    loadInbox();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Incoming Requests</h2>

      {requests.length === 0 ? (
        <p>No requests</p>
      ) : (
        requests.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <p>
              User {r.senderId} wants to learn <b>{r.skill}</b>
            </p>

            {r.status === "PENDING" ? (
              <>
                <button onClick={() => accept(r.id)}>Accept</button>
                <button
                  onClick={() => reject(r.id)}
                  style={{ marginLeft: 10 }}
                >
                  Reject
                </button>
              </>
            ) : (
              <p>Status: {r.status}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}