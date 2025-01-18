/* eslint-disable no-unused-vars */
import React from "react";
import "../Styles/LandingPage.css"; // Link to CSS file

export const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">ExpenseTracker</div>
        <nav className="navigation">
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Expense Tracker</h1>
        <p>Track, manage, and control your expenses efficiently.</p>
        <a href="/signup" className="cta-button">
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Easy to Use</h3>
            <p>
              A user-friendly interface to simplify your expense management.
            </p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>Your data is protected with industry-standard encryption.</p>
          </div>
          <div className="feature">
            <h3>Reports</h3>
            <p>Generate detailed reports to analyze your expenses over time.</p>
          </div>
          <div className="feature">
            <h3>Multi-Platform</h3>
            <p>Access your expenses on mobile, tablet, and desktop devices.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <img
              src="https://i.ibb.co/frqp4mc/IMG-20241223-WA0018.jpg"
              alt="Ram Chandra"
              className="testimonial-pic"
            />
            <p>
              This app changed the way I manage my expenses! Highly
              recommended.
            </p>
            <span><strong>Ravi Kumar</strong></span>
          </div>
          <div className="testimonial">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGQy-7R4anY4HwhDNiCLSxC87I5n-XBnA0Dg&s"
              alt="User Jane"
              className="testimonial-pic"
            />
            <p>
              I love how secure and intuitive it is. Expense Tracker is a
              game-changer!
            </p>
            <span><strong>Mote e Singh</strong> </span>
          </div>
          <div className="testimonial">
            <img
              src="https://media.istockphoto.com/id/1029797636/photo/school-girl-stock-image.jpg?s=612x612&w=0&k=20&c=vTO9wMeghrSTzTrKNvv_vBmjF7yJMMPA-coFg3bab2w="
              alt="User Alice"
              className="testimonial-pic"
            />
            <p>
              A perfect solution for managing my daily finances seamlessly.
            </p>
            <span><strong>Jiya Singh</strong></span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <h3>Create an Account</h3>
            <p>Sign up for free and set up your profile.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h3>Add Your Expenses</h3>
            <p>Easily log your daily expenses in just a few clicks.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h3>Track Progress</h3>
            <p>Get insights and generate detailed reports.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Take Control of Your Finances?</h2>
        <a href="/signup" className="cta-button cta-large">
          Join Now
        </a>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2025 ExpenseTracker. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};
