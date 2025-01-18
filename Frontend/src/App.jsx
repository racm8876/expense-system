/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpenses";
import AdminPage from "./components/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import { LandingPage } from "./components/LandingPage";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Routes wrapped in PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/view-expenses" element={<ViewExpenses />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={10000} // Auto close after 10 seconds
          hideProgressBar={false}
          closeButton={true}
          pauseOnHover={true}
          draggable={true}
        />
      </div>
    </AuthProvider>
  );
};

export default App;
