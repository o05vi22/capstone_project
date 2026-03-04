import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Assessment() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const skillName = params.get("skill") || "Java";

  const userId = Number(localStorage.getItem("userId")) || 1;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const getCategoryName = (skill) => {
    if (!skill) return "Assessment";
    const s = skill.toLowerCase();
    if (["java", "python", "c++", "c", "cpp"].includes(s)) return "Programming Assessment";
    if (s.includes("spring") || s.includes("node")) return "Backend Assessment";
    if (s.includes("mysql") || s.includes("mongo")) return "Database Assessment";
    if (s.includes("git")) return "Git Assessment";
    return skill + " Assessment";
  };

  useEffect(() => {
    api.get(`/assessment/${skillName}/questions`)
      .then(res => setQuestions(res.data))
      .catch(err => alert(err?.response?.data?.error || "No questions found"));
  }, [skillName]);

  const submit = async () => {
    try {
      const res = await api.post("/assessment/submit", {
        userId,
        skillName,
        answers
      });
      setResult(res.data);
    } catch (e) {
      alert(e?.response?.data?.error || "Submit failed");
    }
  };

  if (result) {
    return (
      <div className="container">
        <div className="card card-pad">
          <h2 className="section-title">Result - {skillName}</h2>
          <p className="p">Score: <b>{result.scorePercent}%</b></p>
          <p className="p">Correct: <b>{result.correctAnswers}</b> / {result.totalQuestions}</p>
          <p className="p">Status: <b>{result.passed ? "PASSED ✅" : "FAILED ❌"}</b></p>
          {result.badgeGranted && <p className="p">🎖 Badge granted! Trust increased.</p>}

          <button className="btn btn-primary" onClick={() => nav("/dashboard")} style={{ marginTop: 12 }}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">{getCategoryName(skillName)}</h2>
      <p className="p">Select the correct option and submit.</p>

      {questions.map((q, index) => (
        <div key={q.id} className="card card-pad q-card">
          <div className="q-title">Q{index + 1}. {q.question}</div>

          {["A", "B", "C", "D"].map(opt => {
            const text =
              opt === "A" ? q.optionA :
              opt === "B" ? q.optionB :
              opt === "C" ? q.optionC :
              q.optionD;

            return (
              <label key={opt} className="option">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                />
                <div>
                  <b>{opt}</b>. {text}
                </div>
              </label>
            );
          })}
        </div>
      ))}

      <button className="btn btn-primary" onClick={submit} style={{ marginTop: 16 }}>
        Submit Assessment
      </button>
    </div>
  );
}