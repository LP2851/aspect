import "./Navbar.css";

import { memo } from "react";
import {FaClipboardList, FaUser, FaUsers} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

import { useAuth } from "../../auth/AuthProvider.tsx";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => navigate("/login"));
  };

  return (
    <div className="navbar">
      <a href="/" className="title-gradient">
        aspect
      </a>
      <a className="nav-item border-left border-right" href="/managed-accounts">
        <FaUsers className="nav-icon" /> Managed Accounts
      </a>
      <a className="nav-item border-left border-right" href="/projects">
        <FaClipboardList className="nav-icon" /> Projects
      </a>
      <a className="nav-item pushed-right border-left" href="/profile">
        <FaUser className="nav-icon" /> Profile
      </a>
      <a className="nav-item border-left" aria-label="Logout" onClick={handleLogout}>
        <FiLogOut />
      </a>
    </div>
  );
};

export default memo(Navbar);
