import { memo } from "react";
import "./Navbar.css";

const Navbar = () => (
  <div className="navbar">
    <a href="/" className="title-gradient">
      aspect
    </a>
  </div>
);

export default memo(Navbar);
