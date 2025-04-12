import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const ThreatReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    confidence = "N/A",
    prediction: directPrediction,
    report = "No report generated.",
    raw = {},
    url = "Unknown",
    source = "Unknown Source"
  } = location.state || {};

  const prediction = (directPrediction || raw.prediction || "").toLowerCase();

  let verdict = {
    label: "Unknown",
    color: "#ccc",
    text: "Not enough information.",
    emoji: "❓",
  };

  if (prediction === "legitimate") {
    verdict = {
      label: "Safe",
      color: "#d4edda",
      text: "✅ This website appears safe and trustworthy.",
      emoji: "🟢",
    };
  } else if (prediction === "suspicious") {
    verdict = {
      label: "Suspicious",
      color: "#fff3cd",
      text: "⚠️ This website may be suspicious. Review with caution.",
      emoji: "🟡",
    };
  } else if (prediction === "phishing" || prediction === "malicious") {
    verdict = {
      label: "Phishing Risk",
      color: "#f8d7da",
      text: "🚨 This website is likely dangerous or malicious.",
      emoji: "🔴",
    };
  }
  

  const funFacts = [
    'Nearly 3.4 billion phishing emails are sent every day.',
    'Most phishing sites only last around 15 hours.',
    'Over 90% of data breaches start with phishing.',
    'Financial institutions are the most targeted.',
    'Phishing costs companies billions yearly.',
  ];
  const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9fcff', minHeight: '100vh' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.6rem 1.2rem',
          fontSize: '0.9rem',
          borderRadius: '8px',
          backgroundColor: '#4f7df9',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Back to Home
      </button>

      <h1 style={{ fontSize: '2.4rem', textAlign: 'center' }}>Threat Report</h1>

      {/* Verdict Box */}
      <div
        style={{
          backgroundColor: verdict.color,
          padding: '1rem',
          borderRadius: '12px',
          width: '85%',
          maxWidth: '750px',
          margin: '1rem auto',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {verdict.emoji} {verdict.text}
      </div>

      {/* URL Info */}
      <div
        style={{
          backgroundColor: '#eef6ff',
          padding: '1rem',
          borderRadius: '12px',
          width: '85%',
          maxWidth: '750px',
          margin: '1rem auto',
          fontSize: '1rem',
          textAlign: 'center',
          color: '#333',
        }}
      >
        <p><strong>Scanned URL:</strong> {url}</p>
        <p><strong>Source:</strong> {source}</p>
      </div>

      {/* LLM Summary */}
      <div
        style={{
          backgroundColor: '#f4fff6',
          border: '1px solid #a3e4a2',
          padding: '1.5rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '800px',
          margin: '2rem auto',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          lineHeight: '1.6',
          fontSize: '1rem',
          color: '#333',
        }}
      >
        <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          🧠 <strong>LLM Threat Analysis</strong>
        </div>
        <p style={{ whiteSpace: 'pre-wrap' }}>{report}</p>
        <div style={{ marginTop: '1rem', fontWeight: 'bold', color: '#006600' }}>
          Confidence Score: {confidence}
        </div>
      </div>

      {/* Fun Fact */}
      <div
        style={{
          backgroundColor: '#fff6d6',
          padding: '1rem',
          borderRadius: '12px',
          width: '80%',
          maxWidth: '700px',
          margin: '2rem auto',
          textAlign: 'center',
          fontSize: '1.05rem',
          fontWeight: 500,
          color: '#7a5a00',
        }}
      >
        📢 Fun Fact: {funFact}
      </div>
    </div>
  );
};

export default ThreatReport;
