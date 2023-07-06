import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Navbar = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await auth.handleLogout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-section">
            <ul className="nav-list">
              <li className="nav-item nav-item-home">
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
            </ul>
          </div>

          <div className="nav-section">
            {auth.isAuthenticated ? (
              <ul className="auth-nav-list">
                <li className="nav-item">
                  <span className="welcome-user" onClick={handleProfileClick}>
                    Welcome, {auth.username}
                  </span>
                </li>
                <li className="nav-item">
                  <span className="logout" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="auth-nav-list">
                <li className="nav-item">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login">Log In</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Modal
        isOpen={!!auth.error}
        onRequestClose={() => {
          auth.setError(null);
        }}
        contentLabel={auth.error}
        style={customStyles}
      >
        {auth.error}
      </Modal>
    </>
  );
};

export default Navbar;
