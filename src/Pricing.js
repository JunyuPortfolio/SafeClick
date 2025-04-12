import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Pricing() {
  return (
    <div className="pricing-page">
      <h2 className="pricing-title">Choose Your Plan</h2>
      <div className="pricing-table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Features</th>
              <th>Free</th>
              <th>Premium</th>
              <th>Business</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>URL Scan</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>File Scan</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Email Scan</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Ad-Free</td>
              <td>✗</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Text & Call Scan</td>
              <td>✗</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Company-Wide (100 users)</td>
              <td>✗</td>
              <td>✗</td>
              <td>✓</td>
            </tr>
            <tr className="price-row">
              <td>Price</td>
              <td>$0 / month</td>
              <td>$9.99 / month</td>
              <td>$49.99 / month</td>
            </tr>
            <tr className="signup-row">
              <td></td>
              <td><button className="signup-btn">Sign Up</button></td>
              <td><button className="signup-btn">Sign Up</button></td>
              <td><button className="signup-btn">Sign Up</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
}

export default Pricing;
