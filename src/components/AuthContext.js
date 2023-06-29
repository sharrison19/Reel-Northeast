import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const localToken =
    localStorage.getItem("token") === "null"
      ? false
      : localStorage.getItem("token");
  const [isLocalTokenUpdated, setIsLocalTokenUpdated] = useState(false);

  if (localToken && !isLocalTokenUpdated) {
    setIsAuthenticated(true);
    setUsername(localStorage.getItem("username"));
    setIsLocalTokenUpdated(true);
    setToken(localToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${localToken}`;
  }

  axios.interceptors.response.use(
    (response) => {
      const token = response?.headers?.["token"];
      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
      }
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        setError(error.response.data.message);
      }
      return error;
    }
  );

  const handleAuthentication = async (userCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/login", userCredentials);

      if (response.status === 200 && response.data.token) {
        setIsAuthenticated(true);
        setUsername(userCredentials.username);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", userCredentials.username);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      } else {
        setIsAuthenticated(false);
        setUsername("");
        setToken(null);
        localStorage.setItem("token", null);
        localStorage.setItem("username", null);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setIsAuthenticated(false);
      setUsername("");
      setToken(null);
      localStorage.setItem("token", null);
      localStorage.setItem("username", null);
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (userCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/signup", userCredentials);
      console.log(response);

      if (response.status === 201 && response.data.token) {
        setIsAuthenticated(true);
        setUsername(userCredentials.username);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", userCredentials.username);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      } else {
        setIsAuthenticated(false);
        setUsername("");
        setToken(null);
        localStorage.setItem("token", null);
        localStorage.setItem("username", null);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setIsAuthenticated(false);
      setUsername("");
      setToken(null);
      localStorage.setItem("token", null);
      localStorage.setItem("username", null);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/logout");

      if (response.status === 200) {
        setIsAuthenticated(false);
        setUsername("");
        setToken(null);
        localStorage.setItem("username", null);
        localStorage.setItem("token", null);
        delete axios.defaults.headers.common["Authorization"];
      } else {
        console.error("Logout failed:", response.data);
        setError("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
