import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "200px",
    width: "80%",
    maxWidth: "400px",
    backgroundColor: "#ffcccc",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    color: "#ff3333",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    color: "#666",
    fontSize: "18px",
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
        <FiX
          className="close-button"
          style={customStyles.closeButton}
          onClick={() => {
            auth.setError(null);
          }}
        />
        {auth.error}
      </Modal>
    </>
  );
};

export default Navbar;
