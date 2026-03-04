import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function SkillsSetup() {
  const nav = useNavigate();
  const userId = Number(localStorage.getItem("userId")) || 1;

  const [knowSkill, setKnowSkill] = useState("");
  const [needSkill, setNeedSkill] = useState("");

  const [knowLevel, setKnowLevel] = useState("BEGINNER");
  const [needLevel, setNeedLevel] = useState("BEGINNER");

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
        level,
      });

      await loadLists();
      if (type === "KNOW") setKnowSkill("");
      if (type === "NEED") setNeedSkill("");
    } catch (e) {
      alert(e?.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Skills Setup</h2>

      <div className="card card-pad panel">
        <h3 style={{ margin: 0 }}>Skills I Know</h3>
        <p className="p">Add the skills you can teach others.</p>

        <div className="row" style={{ marginTop: 12 }}>
          <input
            className="input"
            placeholder="Type skill (e.g., Java, Photoshop)"
            value={knowSkill}
            onChange={(e) => setKnowSkill(e.target.value)}
          />

          <select value={knowLevel} onChange={(e) => setKnowLevel(e.target.value)}>
            <option value="BEGINNER">Beginner</option>
            <option value="MODERATE">Moderate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <button className="btn btn-primary" onClick={() => assignSkill(knowSkill, "KNOW", knowLevel)}>
            Add
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          {knowList.length === 0 ? (
            <p className="p">No KNOW skills added yet.</p>
          ) : (
            <ul className="skill-list">
              {knowList.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="card card-pad panel">
        <h3 style={{ margin: 0 }}>Skills I Need</h3>
        <p className="p">Add skills you want to learn.</p>

        <div className="row" style={{ marginTop: 12 }}>
          <input
            className="input"
            placeholder="Type skill you want to learn (e.g., React)"
            value={needSkill}
            onChange={(e) => setNeedSkill(e.target.value)}
          />

          <select value={needLevel} onChange={(e) => setNeedLevel(e.target.value)}>
            <option value="BEGINNER">Beginner</option>
            <option value="MODERATE">Moderate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <button className="btn btn-primary" onClick={() => assignSkill(needSkill, "NEED", needLevel)}>
            Add
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          {needList.length === 0 ? (
            <p className="p">No NEED skills added yet.</p>
          ) : (
            <ul className="skill-list">
              {needList.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="footer-actions">
        <button className="btn btn-outline" onClick={() => nav("/dashboard")}>
          Continue to Dashboard
        </button>

        <button className="btn btn-primary" onClick={() => nav(`/assessment?skill=${encodeURIComponent(needSkill)}`)}>
          Take Assessment for this Skill
        </button>
      </div>
    </div>
  );
}