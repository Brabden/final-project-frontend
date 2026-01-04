import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Attempting to log in with:", { emailOrUsername, password });
    try {
        const response = await axios.post("http://localhost:8000/login/", { email_or_username: emailOrUsername, password });
        if (response.status === 200) {
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            if (onLogin) onLogin();
            navigate("/profile");
        }
    } catch(error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                setError("Invalid credentials. Please try again.")
                console.log(error.response?.data);
            } else {
                setError("An unexpected error occured. Please try again.")
            }
        } else {
            setError("Network error. Please check your connection.")
        }
    }
};


return (
    <div className="auth-page">
        <div className="auth-card">
        <h2 className="auth-title">Sign in</h2>
        <div className="auth-divider" />
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-fields">
            <input
            className="auth-input"
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required 
            />
            <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            </div>
            <button className="auth-button" type="submit">Login</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
    </div>
    </div>
);
};

export default Login;