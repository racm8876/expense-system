/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import { ToastContainer } from "react-toastify";
import '../Styles/Auth/Signup.css';  // Import the CSS file

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Track loading state
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Notify the user using toast
  const notify = (message, type = 'info') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when the form is submitted
    try {
      await axios.post('/api/auth/signup', { name, email, password });
      notify('Signup successful! Please login to continue.', 'success');  // Show success toast
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page after successful signup
      }, 2000);  // Wait for 2 seconds before redirect
    } catch (error) {
      notify(error.response?.data?.error || 'Signup failed. Please try again.', 'error');  // Show error toast
    } finally {
      setLoading(false);  // Set loading to false once the request is completed
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email"
          required
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>

      {/* Toast Container to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
