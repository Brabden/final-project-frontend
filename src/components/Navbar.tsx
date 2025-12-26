import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="logo"><a href="/">⌨️</a></span>
                <span className="brand"><a href="/">Pan</a></span>
            </div>

            <ul className="main-navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/support">Support</a></li>
            </ul>

            <div className="navbar-right">
                <a href="/login" className="auth">Login / Signup</a>
                <a href="/cart" className="cart">🛒</a>
            </div>
        </nav>
    );
};

export default Navbar;