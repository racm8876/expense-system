/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import "../Styles/Auth/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    isAuthenticated: false,
    role: null,
  }); // Combine authentication and role in one state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = (message, type = "info") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify("Please enter both email and password.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { role, token } = response.data;

      // Store token and role in cookies
      Cookies.set("authToken", token, { expires: 1 });
      Cookies.set("userRole", role, { expires: 1 });

      // Update state
      setUserDetails({
        isAuthenticated: true,
        role,
      });

      notify("Login successful! Redirecting...", "success");
    } catch (error) {
      notify(error.response?.data?.error || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails.isAuthenticated) {
      console.log("Redirecting...");
      setTimeout(() => {
        if (userDetails.role === "admin") {
          console.log("Redirecting to admin page...");
          navigate("/admin");
        } else {
          console.log("Redirecting to user home page...");
          navigate("/header");
        }
      }, 2000); // Wait for 2 seconds before redirect
    }
  }, [userDetails, navigate]);

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show role after login */}
      {userDetails.isAuthenticated && (
        <div className="user-role">
          <p>
            You are logged in as{" "}
            <strong>
              {userDetails.role === "admin" ? "Admin" : "User"}
            </strong>
          </p>
        </div>
      )}

      <div className="signup-link">
        <p>
          Don&apos;t have an account? <a href="/signup">Signup</a>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeButton={true}
        pauseOnHover={true}
        draggable={true}
      />
    </div>
  );
};

export default Login;
