import React, { useEffect, useState } from 'react';
import './App.css';

const funFacts = [
  "Phishing costs organizations billions each year.",
  "Nearly 3.4 billion phishing emails are sent every day, making up 1.2% of email traffic.",
  "Over 90% of cyberattacks start with a phishing email.",
  "Phishing attacks increased by 65% in the past year.",
  "Spear phishing emails are 10x more effective than normal phishing attempts.",
];

function ThreatReport({ result }) {
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFunFact(randomFact);
  }, []);

  const getConfidenceColor = (score) => {
    if (score >= 80) return '#ffe066'; // yellow
    if (score >= 50) return '#ffa94d'; // orange
    return '#ff6b6b'; // red
  };

  const confidenceScore = result?.confidence || 0;
  const message = result?.message || "Error checking URL.";
  const color = getConfidenceColor(confidenceScore);

  return (
    <div className="report-container">
      <h1 className="report-title">Threat Report</h1>

      <div className="confidence-box" style={{ backgroundColor: color }}>
        ⚠️ {message} confidence score {confidenceScore}%
      </div>

      <p className="report-description">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
      </p>

      <div className="fun-fact">
        {funFact}
      </div>
    </div>
  );
}

export default ThreatReport;
