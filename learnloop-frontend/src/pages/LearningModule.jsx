import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane, FaLink, FaFileUpload, FaVideo } from "react-icons/fa";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function LearningModule() {

  const { skill } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  const chatRef = useRef(null);

  const user = localStorage.getItem("name") || "User";

  /* AUTO SCROLL CHAT */
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  /* CONNECT WEBSOCKET */
  useEffect(() => {

    const client = new Client({

      webSocketFactory: () => new SockJS("http://localhost:8080/chat"),

      reconnectDelay: 5000,

      onConnect: () => {

        console.log("Connected to WebSocket");

        client.subscribe("/topic/messages", (msg) => {

          const message = JSON.parse(msg.body);

          setMessages(prev => [...prev, message]);

        });

      }

    });

    client.activate();

    setStompClient(client);

    return () => {
      client.deactivate();
    };

  }, []);

  /* SEND CHAT MESSAGE */
  const sendMessage = () => {

    if (!text.trim() || !stompClient) return;

    const message = {
      sender: user,
      content: text,
      skill: skill
    };

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(message)
    });

    setText("");
  };

  /* SHARE MEET LINK */
  const shareMeet = () => {

    const link = prompt("Paste Google Meet Link");

    if (!link || !stompClient) return;

    const message = {
      sender: user,
      content: `📹 Meet Link: ${link}`,
      skill: skill
    };

    stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
  };

  /* VIDEO CALL BUTTON */
  const startVideoCall = () => {

    const meet = "https://meet.google.com/new";

    window.open(meet, "_blank");

  };

  /* FILE SHARE */
  const uploadFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFiles([...files, file]);

    if (!stompClient) return;

    const message = {
      sender: user,
      content: `📎 Shared file: ${file.name}`,
      skill: skill
    };

    stompClient.send("/app/sendMessage", {}, JSON.stringify(message));

  };

  const styles = {

    page: {
      display: "grid",
      gridTemplateColumns: "280px 1fr",
      height: "100vh",
      background: "#f5f7fb",
      fontFamily: "Inter, sans-serif"
    },

    sidebar: {
      background: "#ffffff",
      padding: "25px",
      borderRight: "1px solid #e5e7eb"
    },

    title: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "10px"
    },

    skill: {
      color: "#6366f1",
      marginBottom: "20px"
    },

    resourceBtn: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      background: "#4f46e5",
      color: "#fff",
      cursor: "pointer",
      marginBottom: "15px"
    },

    fileItem: {
      background: "#f3f4f6",
      padding: "8px",
      borderRadius: "6px",
      marginTop: "8px"
    },

    chatContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },

    chat: {
      flex: 1,
      padding: "25px",
      overflowY: "auto"
    },

    bubble: {
      padding: "12px 16px",
      borderRadius: "14px",
      marginBottom: "12px",
      maxWidth: "60%",
      lineHeight: "1.4"
    },

    me: {
      background: "#4f46e5",
      color: "#fff",
      marginLeft: "auto"
    },

    other: {
      background: "#e5e7eb"
    },

    time: {
      fontSize: "11px",
      opacity: 0.7,
      marginTop: "4px"
    },

    inputArea: {
      display: "flex",
      padding: "15px",
      borderTop: "1px solid #e5e7eb",
      background: "#fff"
    },

    input: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      marginRight: "10px"
    },

    send: {
      padding: "12px 16px",
      border: "none",
      borderRadius: "10px",
      background: "#4f46e5",
      color: "#fff",
      cursor: "pointer"
    }

  };

  return (

    <div style={styles.page}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <div style={styles.title}>Learning Session</div>

        <div style={styles.skill}>Skill: {skill}</div>

        <button style={styles.resourceBtn} onClick={shareMeet}>
          <FaLink /> Share Meet Link
        </button>

        <button style={styles.resourceBtn} onClick={startVideoCall}>
          <FaVideo /> Start Video Call
        </button>

        <label style={styles.resourceBtn}>
          <FaFileUpload /> Upload File
          <input
            type="file"
            onChange={uploadFile}
            style={{ display: "none" }}
          />
        </label>

        <h4>Shared Files</h4>

        {files.map((f, i) => (
          <div key={i} style={styles.fileItem}>
            {f.name}
          </div>
        ))}

      </div>


      {/* CHAT AREA */}

      <div style={styles.chatContainer}>

        <div style={styles.chat} ref={chatRef}>

          {messages.map((m, i) => {

            const isMe = m.sender === user;

            return (

              <div
                key={i}
                style={{
                  ...styles.bubble,
                  ...(isMe ? styles.me : styles.other)
                }}
              >

                <b>{m.sender}</b>

                <div>{m.content}</div>

                <div style={styles.time}>
                  {new Date().toLocaleTimeString()}
                </div>

              </div>

            );

          })}

        </div>


        {/* MESSAGE INPUT */}

        <div style={styles.inputArea}>

          <input
            style={styles.input}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            style={styles.send}
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>

  );

}