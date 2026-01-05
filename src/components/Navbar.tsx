import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axios";
import { useCartContext } from "../context/CartContext";
import { ShoppingBag, Keyboard, UserCircle } from "lucide-react";

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
          <span className="brand">Pan</span>
        </Link>
      </div>

      <ul className="main-navbar-links">
        <li>
          <a href="/shop">Shop</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/support">Support</a>
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
            <a href="/login" className="auth">
              Login
            </a>
            <a href="/signup" className="signup">
              Signup
            </a>
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
