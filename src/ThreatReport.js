import React from 'react';
import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';

const funFacts = [
  'Nearly 3.4 billion phishing emails are sent every day, making up 1.2% of email traffic.',
  'Phishing attacks are responsible for over 90% of data breaches.',
  'Most phishing sites only live for around 15 hours.',
  'Financial institutions are the most targeted by phishing scams.',
  'Phishing costs organizations billions each year.',
];

const ThreatReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confidence = 0, report = "Error checking URL." } = location.state || {};
  const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  const getBoxColor = (score) => {
    if (score >= 70) return '#ffe176';
    if (score >= 30) return '#fff5cc';
    return '#d1ffd1';
  };

  return (
    <div className="App" style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f9fcff', position: 'relative' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          backgroundColor: '#4f7df9',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Back to Home
      </button>

      <h1 style={{ fontSize: '2.5rem' }}>Threat Report</h1>

      <div
        style={{
          backgroundColor: getBoxColor(confidence),
          padding: '1rem',
          margin: '1.5rem auto',
          borderRadius: '10px',
          width: '80%',
          maxWidth: '700px',
          textAlign: 'center',
          fontSize: '1.2rem',
        }}
      >
        <span role="img" aria-label="warning">⚠️</span> {report} — Confidence Score: {confidence}%
      </div>

      <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
      </p>

      <div
        style={{
          backgroundColor: '#ffe176',
          padding: '1rem',
          margin: '2rem auto',
          borderRadius: '20px',
          width: '85%',
          maxWidth: '800px',
          fontSize: '1.1rem',
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        {funFact}
      </div>
    </div>
  );
};

export default ThreatReport;
