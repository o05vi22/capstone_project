import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Assessment() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const skillName = params.get("skill") || "Java";

  const userId = Number(localStorage.getItem("userId")) || 1;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // {questionId: "A"}
const getCategoryName = (skill) => {
  if (!skill) return "Assessment";

  const s = skill.toLowerCase();

  if (["java", "python", "c++", "c", "cpp"].includes(s))
    return "Programming Assessment";

  if (s.includes("spring") || s.includes("node"))
    return "Backend Assessment";

  if (s.includes("mysql") || s.includes("mongo"))
    return "Database Assessment";

  if (s.includes("git"))
    return "Git Assessment";

  return skill + " Assessment";
};
  const [result, setResult] = useState(null);

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
      <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
        <h2>Result - {skillName}</h2>
        <p>Score: <b>{result.scorePercent}%</b></p>
        <p>Correct: <b>{result.correctAnswers}</b> / {result.totalQuestions}</p>
        <p>Status: <b>{result.passed ? "PASSED ✅" : "FAILED ❌"}</b></p>
        {result.badgeGranted && <p>🎖 Badge granted! Trust increased.</p>}

        <button onClick={() => nav("/dashboard")} style={{ marginTop: 12 }}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>{getCategoryName(skillName)}</h2>
      <p>Select the correct option and submit.</p>

      {questions.map((q, index) => (
        <div key={q.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12, marginTop: 12 }}>
          <b>Q{index + 1}. {q.question}</b>

          {["A", "B", "C", "D"].map(opt => {
            const text =
              opt === "A" ? q.optionA :
              opt === "B" ? q.optionB :
              opt === "C" ? q.optionC :
              q.optionD;

            return (
              <label key={opt} style={{ display: "block", marginTop: 8 }}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                />
                {" "}{opt}. {text}
              </label>
            );
          })}
        </div>
      ))}

      <button onClick={submit} style={{ marginTop: 16 }}>
        Submit Assessment
      </button>
    </div>
  );
}