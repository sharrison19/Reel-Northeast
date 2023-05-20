import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about">About</a>
        </li>
        <li className="nav-item">
          <a href="/forum">Forum</a>
        </li>
        <li className="nav-item">
          <a href="/categories">Categories</a>
        </li>
        <li className="nav-item">
          <a href="/species">Species</a>
        </li>
        <li className="nav-item">
          <a href="/states">States</a>
        </li>
        <li className="nav-item">
          <a href="/connect">Connect</a>
        </li>
        <li className="nav-item">
          <a href="/signup">Sign Up</a>
        </li>
        <li className="nav-item">
          <a href="/login">Log In</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
