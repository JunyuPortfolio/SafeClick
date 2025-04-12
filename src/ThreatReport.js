import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function ThreatReport() {
  const location = useLocation();
  const result = location.state?.result || {
    message: 'No data received.',
    score: 0,
    fact: 'Phishing scams are increasingly sophisticated.',
  };

  return (
    <div className="report-container">
      <h1>Threat Report</h1>

      <div className="alert-box">
        <span>⚠️ {result.message} confidence score {result.score}%</span>
      </div>

      <p className="threat-description">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
      </p>

      <div className="fact-box">
        {result.fact}
      </div>
    </div>
  );
}

export default ThreatReport;
