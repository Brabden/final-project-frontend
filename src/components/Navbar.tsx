import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axios";
import { useCartContext } from "../context/CartContext";
import { ShoppingBag, Keyboard, UserCircle, User, Search } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import AccountMenu from "./AccountMenu";

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
  const [searchOpen, setSearchOpen] = useState(false);

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
    <>
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
              <AccountMenu
                user={user}
                onLogin={() => navigate("/login")}
                onSignup={() => navigate("/signup")}
                onLogout={logout}
              />
              
          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search />
          </button>
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
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
