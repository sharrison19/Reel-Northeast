import React, { createContext, useState } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initialize the authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  // Function to handle authentication
  const handleAuthentication = async (userCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // Make an API call to authenticate the user
      const response = await axios.post("/login", userCredentials);

      // Check the response status or data to determine if authentication was successful
      if (response.status === 200 && response.data.token) {
        // Authentication successful
        setIsAuthenticated(true);
        setUsername(userCredentials.username);
        setToken(response.data.token); // Save the JWT token
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`; // Set the Authorization header for all future requests
      } else {
        // Authentication failed
        setIsAuthenticated(false);
        setUsername("");
      }
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Authentication failed:", error);
      setIsAuthenticated(false);
      setUsername("");
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle signup
  const handleSignup = async (userCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // Make an API call to sign up the user
      const response = await axios.post("/signup", userCredentials);

      // Check the response status or data to determine if signup was successful
      if (response.status === 201 && response.data.token) {
        // Signup successful
        setIsAuthenticated(true);
        setUsername(userCredentials.username);
        setToken(response.data.token); // Save the JWT token
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`; // Set the Authorization header for all future requests
      } else {
        // Signup failed
        setIsAuthenticated(false);
        setUsername("");
      }
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Signup failed:", error);
      setIsAuthenticated(false);
      setUsername("");
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make an API call to log out the user
      const response = await axios.post("/logout");

      // Check the response status to determine if logout was successful
      if (response.status === 200) {
        // Logout successful
        setIsAuthenticated(false);
        setUsername("");
        setToken(null); // Clear the saved token
        delete axios.defaults.headers.common["Authorization"]; // Remove the Authorization header for future requests
      } else {
        // Logout failed
        console.error("Logout failed:", response.data);
        setError("Logout failed. Please try again.");
      }
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Provide the authentication state and functions to child components
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        token,
        handleAuthentication,
        handleSignup,
        handleLogout,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
