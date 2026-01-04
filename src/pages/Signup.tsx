import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  onLogin?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", email, "Password:", password);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/signup/", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        const { access, refresh } = response.data;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        setSuccessMessage("Signup successful! You can now log in.");
        if (onLogin) onLogin();
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.status === 400
      ) {
        setError("Signup failed. Please try again.");
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <div className="auth-divider" />

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-fields">
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />

            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <input
              className="auth-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button className="auth-button" type="submit">
            Sign Up
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}
        {successMessage && <p className="auth-success">{successMessage}</p>}
      </div>
    </div>
  );
};
export default Signup;
