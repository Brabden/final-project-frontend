import { useState } from "react";
import { User, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./AccountMenu.css";

interface AccountMenuProps {
  user: { username: string } | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  user,
  onLogin,
  onSignup,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="profile-menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="avatar-btn" aria-label="account-menu">
        {user ? <UserCircle size={20} /> : <User size={20} />}
        {user && <span className="username">{user.username}</span>}
      </button>

      {open && (
        <div className="profile-dropdown">
          {user ? (
            <>
              <Link to="/profile">profile</Link>
              <button className="danger" onClick={onLogout}>
                logout
              </button>
            </>
          ) : (
            <>
              <button onClick={onLogin}>login</button>
              <button onClick={onSignup}>signup</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
