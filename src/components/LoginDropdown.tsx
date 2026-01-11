import { useState } from "react";
import { User } from "lucide-react";
import "./LoginDropdown.css";

interface DropdownProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LoginDropdown: React.FC<DropdownProps> = ({ onLogin, onSignup }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="profile-menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="avatar-btn" aria-label="account-menu">
        <User className="cart-icon" />
      </button>

      {open && (
        <div
          className="profile-dropdown"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button onClick={onLogin}>login</button>
          <button onClick={onSignup}>signup</button>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
