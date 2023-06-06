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

  // Function to handle authentication
  const handleAuthentication = async (userCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // Make an API call to authenticate the user
      const response = await axios.post("/api/login", userCredentials);

      // Check the response status or data to determine if authentication was successful
      if (response.status === 200 && response.data.isAuthenticated) {
        // Authentication successful
        setIsAuthenticated(true);
      } else {
        // Authentication failed
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Authentication failed:", error);
      setIsAuthenticated(false);
      setError("Authentication failed. Please try again.");
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
      const response = await axios.post("/api/logout");

      // Check the response status to determine if logout was successful
      if (response.status === 200) {
        // Logout successful
        setIsAuthenticated(false);
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
        handleAuthentication,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
