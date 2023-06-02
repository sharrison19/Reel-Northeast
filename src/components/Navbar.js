import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/forum">Forum</Link>
        </li>
        <li className="nav-item">
          <Link to="/species">Species</Link>
        </li>
        <li className="nav-item">
          <Link to="/states">States</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
