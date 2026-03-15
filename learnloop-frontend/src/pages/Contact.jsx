import { useState } from "react";

export default function Contact() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const submit = (e)=>{
    e.preventDefault();
    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="container">
      <div className="card card-pad form-card">

        <h2 className="section-title">Contact Us</h2>

        <p className="p">
          Have questions or suggestions? Send us a message.
        </p>

        <form className="form" onSubmit={submit}>

          <input
            className="input"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="input"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <textarea
            className="input"
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />

          <button className="btn btn-primary">
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}