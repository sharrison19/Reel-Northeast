import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the server with the user data
      const response = await axios.post("/signup", {
        firstName,
        lastName,
        email,
        username,
        password,
      });

      // Display the success message from the server
      console.log(response.data.message);

      // Reset the form after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      // Display the error message from the server
      console.error(error.response.data.message);
    }
  };
  return (
    <div className="signup-form-wrapper">
      <div className="signup-content">
        <div className="sales-pitch">
          <h2>Welcome to Reel Northeast - Your Ultimate Fishing Community!</h2>
          <p>
            Are you passionate about fishing and exploring the bountiful waters
            of the Northeast? Look no further! Reel Northeast is here to provide
            you with an exceptional fishing community experience.
          </p>
          <p>
            Join our vibrant community of fellow anglers, where you can connect,
            share, and learn from fishing enthusiasts just like you. Whether
            you're a seasoned angler with years of experience or a beginner
            eager to learn the ropes, Reel Northeast has something for everyone.
          </p>
          <h3>Why Choose Reel Northeast?</h3>
          <ul>
            <li>
              <strong>Connect with Like-minded Anglers:</strong> Expand your
              network and connect with passionate anglers from the Northeast
              region. Share your fishing stories, exchange tips, and form
              lasting friendships with fellow anglers who understand your
              fishing adventures.
            </li>
            <li>
              <strong>Explore the Best Fishing Spots:</strong> Discover the
              hidden gems of the Northeast's lakes, rivers, and coastlines. Our
              community members generously share their favorite fishing spots,
              hot fishing reports, and insider knowledge to help you make the
              most of your fishing trips.
            </li>
            <li>
              <strong>Learn and Improve:</strong> Enhance your fishing skills
              and knowledge through our vast collection of articles, tutorials,
              and guides. From casting techniques to lure selection, our experts
              cover a wide range of topics to help you become a more successful
              angler.
            </li>
            <li>
              <strong>Showcase Your Catches:</strong> Share your proudest
              catches with the community and get recognized for your fishing
              achievements. From trophy catches to unique species, our members
              love celebrating each other's fishing triumphs.
            </li>
            <li>
              <strong>Participate in Exciting Events and Contests:</strong> Get
              involved in our thrilling fishing events, competitions, and
              challenges. Test your skills, compete against other anglers, and
              win exciting prizes that will elevate your fishing experience to
              new heights.
            </li>
            <li>
              <strong>Stay Updated with Fishing News:</strong> Stay informed
              about the latest fishing trends, regulations, and news impacting
              the Northeast fishing community. Our dedicated news section keeps
              you in the loop, ensuring you're always up to date with the latest
              happenings in the fishing world.
            </li>
          </ul>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Sign Up!</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
