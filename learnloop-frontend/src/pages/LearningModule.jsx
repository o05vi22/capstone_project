import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function LearningModule() {

  const { skill } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const userName = localStorage.getItem("name") || "User";

  const sendMessage = () => {
    if (!text) return;

    setMessages([
      ...messages,
      { sender: userName, message: text }
    ]);

    setText("");
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles([...files, file]);
  };

  const shareMeet = () => {

    const meetLink = prompt("Paste Google Meet link");

    if (!meetLink) return;

    setMessages([
      ...messages,
      {
        sender: userName,
        message: `Shared Meet Link: ${meetLink}`
      }
    ]);
  };

  const styles = {

    page:{
      display:"grid",
      gridTemplateColumns:"300px 1fr",
      height:"100vh",
      fontFamily:"Arial"
    },

    sidebar:{
      background:"#f3f4f6",
      padding:"20px",
      borderRight:"1px solid #ddd"
    },

    main:{
      display:"flex",
      flexDirection:"column"
    },

    chat:{
      flex:1,
      padding:"20px",
      overflowY:"auto"
    },

    message:{
      marginBottom:"10px",
      padding:"10px",
      background:"#eef2ff",
      borderRadius:"8px"
    },

    inputArea:{
      display:"flex",
      gap:"10px",
      padding:"10px",
      borderTop:"1px solid #ddd"
    },

    input:{
      flex:1,
      padding:"10px"
    },

    button:{
      padding:"10px 15px",
      background:"#27216b",
      color:"#fff",
      border:"none",
      borderRadius:"6px",
      cursor:"pointer"
    },

    fileItem:{
      background:"#fff",
      padding:"8px",
      marginTop:"8px",
      borderRadius:"6px"
    }

  };

  return (

    <div style={styles.page}>

      {/* LEFT SIDE */}

      <div style={styles.sidebar}>

        <h2>Learning Session</h2>
        <p><b>Skill:</b> {skill}</p>

        <hr />

        <h3>Shared Resources</h3>

        <button style={styles.button} onClick={shareMeet}>
          Share Meet Link
        </button>

        <br /><br />

        <input type="file" onChange={uploadFile} />

        {files.map((f,i)=>(
          <div key={i} style={styles.fileItem}>
            {f.name}
          </div>
        ))}

      </div>


      {/* RIGHT SIDE */}

      <div style={styles.main}>

        <div style={styles.chat}>

          {messages.map((m,i)=>(
            <div key={i} style={styles.message}>
              <b>{m.sender}</b>: {m.message}
            </div>
          ))}

        </div>

        <div style={styles.inputArea}>

          <input
            style={styles.input}
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Type message..."
          />

          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}