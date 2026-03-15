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
  const [codeAnswer, setCodeAnswer] = useState("");
  const [language, setLanguage] = useState("Java");
  const [step, setStep] = useState(1);

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

  const getCodingQuestion = (skill) => {
    const s = skill.toLowerCase();

    if (s === "java") {
      return "Write a Java program to check whether a number is palindrome.";
    }
    if (s === "python") {
      return "Write a Python program to find factorial of a number.";
    }
    if (s === "c" || s === "c++" || s === "cpp") {
      return "Write a program to reverse a string.";
    }
    if (s.includes("spring")) {
      return "Write a Spring Boot REST controller that returns 'Hello LearnLoop'.";
    }
    if (s.includes("mysql")) {
      return "Write an SQL query to find students with marks greater than 80.";
    }

    return `Write a program related to ${skillName}.`;
  };

  useEffect(() => {
    api.get(`/assessment/${skillName}/questions`)
      .then((res) => setQuestions(res.data))
      .catch((err) =>
        alert(err?.response?.data?.error || "No questions found")
      );
  }, [skillName]);

  const submit = async () => {
    try {
      const res = await api.post("/assessment/submit", {
        userId,
        skillName,
        answers,
      });

      localStorage.setItem("codeAnswer", codeAnswer);
      localStorage.setItem("codingLanguage", language);

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

          <p className="p">
            Score: <b>{result.scorePercent}%</b>
          </p>

          <p className="p">
            Correct: <b>{result.correctAnswers}</b> / {result.totalQuestions}
          </p>

          <p className="p">
            Status: <b>{result.passed ? "PASSED ✅" : "FAILED ❌"}</b>
          </p>

          {result.badgeGranted && (
            <p className="p">🎖 Badge granted! Trust increased.</p>
          )}

          <hr style={{ margin: "20px 0" }} />

          <h3>Coding Round</h3>

          <p>
            <b>Question:</b> {getCodingQuestion(skillName)}
          </p>

          <p>
            <b>Language:</b> {language}
          </p>

          <p>
            <b>Status:</b> {codeAnswer.trim() ? "Attempted ✅" : "Not Attempted ❌"}
          </p>

          <div
            style={{
              background: "#1e1e1e",
              color: "#00ff90",
              padding: "14px",
              borderRadius: "10px",
              marginTop: "10px",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            {codeAnswer || "No code submitted"}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => nav("/dashboard")}
            style={{ marginTop: 15 }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">{getCategoryName(skillName)}</h2>

      {/* STEP 1 = MCQ PAGE */}
      {step === 1 && (
        <>
          <p className="p">Step 1 of 2 — Complete the MCQ Round.</p>

          <h3 style={{ marginTop: 20 }}>MCQ Round</h3>

          {questions.map((q, index) => (
            <div key={q.id} className="card card-pad q-card">
              <div className="q-title">
                Q{index + 1}. {q.question}
              </div>

              {["A", "B", "C", "D"].map((opt) => {
                const text =
                  opt === "A"
                    ? q.optionA
                    : opt === "B"
                    ? q.optionB
                    : opt === "C"
                    ? q.optionC
                    : q.optionD;

                return (
                  <label key={opt} className="option">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                      }
                    />

                    <div>
                      <b>{opt}</b>. {text}
                    </div>
                  </label>
                );
              })}
            </div>
          ))}

          <button
            className="btn btn-primary"
            onClick={() => setStep(2)}
            style={{ marginTop: 16 }}
          >
            Next: Coding Round
          </button>
        </>
      )}

      {/* STEP 2 = CODING PAGE */}
      {step === 2 && (
        <>
          <p className="p">Step 2 of 2 — Complete the Coding Round.</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>Coding Round</h3>

              <h4>Problem</h4>

              <p style={{ fontWeight: "bold" }}>
                {getCodingQuestion(skillName)}
              </p>

              <p style={{ fontSize: "14px", color: "#666" }}>
                Implement the solution using the selected language.
              </p>

              <h5>Example Input</h5>
              <pre style={{ background: "#f4f4f4", padding: "10px" }}>121</pre>

              <h5>Example Output</h5>
              <pre style={{ background: "#f4f4f4", padding: "10px" }}>
Palindrome
              </pre>
            </div>

            <div
              style={{
                background: "#1e1e1e",
                padding: "15px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ marginBottom: "10px", color: "#fff" }}>
                Language:
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option>Java</option>
                  <option>Python</option>
                  <option>C++</option>
                  <option>SQL</option>
                </select>
              </div>

              <textarea
                value={codeAnswer}
                onChange={(e) => setCodeAnswer(e.target.value)}
                placeholder="Write your code here..."
                style={{
                  flex: 1,
                  background: "#1e1e1e",
                  color: "#00ff90",
                  border: "none",
                  outline: "none",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  minHeight: "220px",
                }}
              />

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "8px 14px",
                    background: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Run Code
                </button>

                <button
                  type="button"
                  style={{
                    padding: "8px 14px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => alert("Code saved successfully!")}
                >
                  Save Code
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: "12px" }}>
            <button
              className="btn"
              onClick={() => setStep(1)}
              style={{
                background: "#6c757d",
                color: "#fff",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Back to MCQ
            </button>

            <button
              className="btn btn-primary"
              onClick={submit}
            >
              Submit Assessment
            </button>
          </div>
        </>
      )}
    </div>
  );
}yes