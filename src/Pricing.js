import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const plans = ['Free', 'Premium', 'Business'];

const features = [
  { name: 'URL Scan', values: [true, true, true] },
  { name: 'File Scan', values: [true, true, true] },
  { name: 'Email Scan', values: [true, true, true] },
  { name: 'Ad-Free', values: [false, true, true] },
  { name: 'Text & Call Scan', values: [false, true, true] },
  { name: 'Company-Wide (100 users)', values: [false, false, true] },
];

const prices = ['$0 / month', '$9.99 / month', '$49.99 / month'];

const Pricing = () => {
  return (
    <div className="pricing-page">
      <div className="navbar">
       <h2 style={{ fontWeight: 'bold' }}>Safe Click</h2>
        <Link to="/" className="btn-outline">Back to Home</Link>
      </div>

      <h2 className="pricing-title">Choose Your Plan</h2>

      <div className="pricing-table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Features</th>
              {plans.map(plan => (
                <th key={plan}>{plan}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx}>
                <td>{feature.name}</td>
                {feature.values.map((hasFeature, i) => (
                  <td key={i}>{hasFeature ? '✓' : '✕'}</td>
                ))}
              </tr>
            ))}
            <tr className="price-row">
              <td><strong>Price</strong></td>
              {prices.map((price, i) => (
                <td key={i}><strong>{price}</strong></td>
              ))}
            </tr>
            <tr className="signup-row">
              <td></td>
              {plans.map((_, i) => (
                <td key={i}>
                  <button className="signup-btn">Sign Up</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;
