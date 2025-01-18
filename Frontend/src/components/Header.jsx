/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Head_footer/Header.css'; // For optional styling

const Header = () => (
  <header>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/add-expense">Add Expense</Link>
      <Link to="/view-expenses">View Expenses</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  </header>
);

export default Header;
 
