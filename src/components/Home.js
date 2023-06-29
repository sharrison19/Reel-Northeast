import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-container">
      <h1 className="slogan">
        Cast your lines, share your tales and reel in the adventure in the
        Northeast!
      </h1>
      <h2 className="welecome">Welcome to Reel Northeast</h2>
      <p className="home-para">
        Join our fishing community and dive into the world of fishing in the
        Northeast region. Whether you're an experienced angler or just starting
        out, there's something for everyone.
      </p>
      <p className="home-para">
        Explore the latest fishing tips, share your catches, connect with fellow
        fishing enthusiasts, and discover the best spots to reel in your next
        big catch.
      </p>
      {!isAuthenticated && (
        <Link to="/signup">
          <button className="get-started-btn">Get Started</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
