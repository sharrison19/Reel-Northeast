import React from "react";
import logo from "../images/logo.jpg";

const Header = () => {
  return (
    <header>
      <h1 className="title">Reel Northeast</h1>
      <img className="logo" src={logo} alt="Logo" />
    </header>
  );
};

export default Header;
