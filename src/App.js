import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
