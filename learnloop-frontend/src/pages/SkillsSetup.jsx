import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function SkillsSetup() {
  const nav = useNavigate();
  const userId = Number(localStorage.getItem("userId")) || 1;

  const [knowSkill, setKnowSkill] = useState("");
  const [needSkill, setNeedSkill] = useState("");

  const [knowLevel, setKnowLevel] = useState("BEGINNER");
  const [needLevel, setNeedLevel] = useState("BEGINNER"); // optional but kept

  const [knowList, setKnowList] = useState([]);
  const [needList, setNeedList] = useState([]);

  const loadLists = async () => {
    const k = await api.get(`/skills/user/${userId}?type=KNOW`);
    const n = await api.get(`/skills/user/${userId}?type=NEED`);
    setKnowList(k.data);
    setNeedList(n.data);
  };

  useEffect(() => {
    loadLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignSkill = async (skillName, type, level) => {
    try {
      if (!skillName.trim()) return alert("Type a skill name");

      await api.post("/skills/assign", {
        userId,
        skillName: skillName.trim(),
        type,
        level, // for NEED you can still send it; backend allows
      });

      await loadLists();
      if (type === "KNOW") setKnowSkill("");
      if (type === "NEED") setNeedSkill("");
    } catch (e) {
      alert(e?.response?.data?.error || "Failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 750, margin: "0 auto" }}>
      <h2>Skills Setup</h2>

      <div style={{ marginTop: 20, padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
        <h3>Skills I Know</h3>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            placeholder="Type skill (e.g., Java, Photoshop)"
            value={knowSkill}
            onChange={(e) => setKnowSkill(e.target.value)}
          />

          <select value={knowLevel} onChange={(e) => setKnowLevel(e.target.value)}>
            <option value="BEGINNER">Beginner</option>
            <option value="MODERATE">Moderate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <button onClick={() => assignSkill(knowSkill, "KNOW", knowLevel)}>Add</button>
        </div>

        <div style={{ marginTop: 12 }}>
          {knowList.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No KNOW skills added yet.</p>
          ) : (
            <ul>
              {knowList.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
        <h3>Skills I Need</h3>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            placeholder="Type skill you want to learn (e.g., React)"
            value={needSkill}
            onChange={(e) => setNeedSkill(e.target.value)}
          />

          {/* Optional: keep level even for NEED */}
          <select value={needLevel} onChange={(e) => setNeedLevel(e.target.value)}>
            <option value="BEGINNER">Beginner</option>
            <option value="MODERATE">Moderate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <button onClick={() => assignSkill(needSkill, "NEED", needLevel)}>Add</button>
        </div>

        <div style={{ marginTop: 12 }}>
          {needList.length === 0 ? (
            <p style={{ opacity: 0.7 }}>No NEED skills added yet.</p>
          ) : (
            <ul>
              {needList.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          )}
        </div>
      </div>

      <button style={{ marginTop: 20 }} onClick={() => nav("/dashboard")}>
        Continue to Dashboard
      </button>
      <button onClick={() => nav(`/assessment?skill=${encodeURIComponent(needSkill)}`)}>
  Take Assessment for this Skill
</button>
    </div>
  );
}