import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Home from "./components/Home";
import Species from "./components/Species";
import About from "./components/About";
import States from "./components/States";
import Connect from "./components/Connect";
import Forum from "./components/Forum";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/species" element={<Species />} />
        <Route path="/states" element={<States />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
