import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { CheckCircle, XCircle } from "lucide-react";

const Profile: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const payload: any = {};
      if (email.trim()) payload.email = email;
      if (username.trim()) payload.username = username;
      await axios.put("http://localhost:8000/update-profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile updated successfully!");
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to update profile");
      setStatus("error");
    }
  };

  const changePassword = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      await axios.post(
        "http://localhost:8000/change-password/",
        { old_password: oldPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password changed successfully!");
      setStatus("success");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to change password");
      setStatus("error");
    }
  };

  return (
    <div className="profile-page">
      <h2 className="page-title">profile</h2>
      {message && (
        <div className={`status-message ${status}`}>
          {status === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span>{message}</span>
        </div>
      )}
      <div className="card">
        <h3 className="card-title">account details</h3>
        <div className="form-group">
          <label>username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="new username"
          />
        </div>
        <div className="form-group">
          <label>email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="new email"
          />
        </div>

        <button className="primary-btn" onClick={updateProfile}>
          save changes
        </button>
      </div>
      <div className="card">
        <h3 className="card-title">change password</h3>

        <div className="form-group">
          <label>old password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="current password"
          />
        </div>

        <div className="form-group">
          <label>new password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="new password"
          />
        </div>
        <button className="secondary-btn" onClick={changePassword}>
          change password
        </button>
      </div>
    </div>
  );
};

export default Profile;
