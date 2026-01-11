import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axios";
import { useCartContext } from "../context/CartContext";
import { ShoppingBag, Keyboard, UserCircle, User } from "lucide-react";
import LoginDropdown from "./LoginDropdown";

interface User {
  username: string;
  email: string;
}

interface NavbarProps {
  refresh?: boolean;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ refresh, onCartClick }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const { cartItems } = useCartContext();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    axiosInstance
      .get("/profile/")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [refresh]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-brand">
          <Keyboard className="logo-icon" />
          <span className="brand">pan</span>
        </Link>
      </div>

      <ul className="main-navbar-links">
        <li>
          <a href="/shop">shop</a>
        </li>
        <li>
          <a href="/about">about</a>
        </li>
        <li>
          <a href="/support">support</a>
        </li>
      </ul>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="user">
              <UserCircle className="profile-icon" aria-hidden />{" "}
              <span>{user.username}</span>
            </Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <LoginDropdown
              onLogin={() => navigate("/login")}
              onSignup={() => navigate("/signup")}
            />
          </>
        )}
        <button
          type="button"
          className="cart"
          onClick={onCartClick}
          aria-label="Open cart"
        >
          <ShoppingBag className="cart-icon" />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
