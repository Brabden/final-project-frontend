import React, { useState } from "react";
import axios from "axios";

const Support: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:8000/support-request/", {
        name,
        email,
        message,
      });
      setStatus("Request sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setStatus(err.response?.data?.error || "Failed to send request.");
    }
  };

  return (
    <div className="support-container">
      <h3 className="support-title">have any questions?</h3>
      <p className="support-description">
        we value your input and the longevity of our products highly! please
        send us an email using the form below so we can assist you better!
        please allow 1-3 business days for a response.
      </p>
      <form className="support-form" onSubmit={handleSubmit}>
        <div className="support-grid">
          <input
            className="support-input"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="support-input"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="support-textarea"
            placeholder="Your Request"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button className="support-button" type="submit">
          Submit
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Support;
