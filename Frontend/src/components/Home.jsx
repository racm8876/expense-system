/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
// Optional import for styling, if applicable
import '../Styles/Home/Home.css';  

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Expense Tracker</h1>
        <p>Track, manage, and control your expenses effectively.</p>
      </header>

      <div className="home-links">
        <Link to="/add-expense" className="home-link">
          Add Expense
        </Link>
        <Link to="/view-expenses" className="home-link">
          View Expenses
        </Link>
        <Link to="/profile" className="home-link">
          View Profile
        </Link>
        {/* Add this only if you have a Reports component and route */}
        <Link to="/reports" className="home-link">
          Reports (Weekly/Monthly/Yearly)
        </Link>
      </div>
    </div>
  );
};

export default Home;
