import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";

const Header = () => {
  return (
    <header>
      <Link to="/" className="home-title">
        Reel Northeast
      </Link>
      <img className="logo" src={logo} alt="Logo" />
    </header>
  );
};

export default Header;
