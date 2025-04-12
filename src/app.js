import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Pricing from './Pricing';
import ThreatReport from './ThreatReport';

function HomePage() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleCheck = () => {
    const isValidURL = /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url);
    navigate('/threat-report', {
      state: {
        url: isValidURL ? url : null,
        file: file,
      },
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-text">Safe Click</div>
        <a className="pricing-button" href="/pricing">Pricing</a>
      </header>

      <main className="main-content">
        <h1 className="main-title">Worried about a sketchy site?</h1>
        <p className="main-subtitle">Paste the URL or insert the screenshot below to check if it's safe</p>
        <input
          className="input-box"
          type="text"
          placeholder="Paste a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="file-input"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="check-button" onClick={handleCheck}>
          🔍 Check Safety
        </button>
      </main>

      <footer className="footer-content">
        <span>© 2025 SafeClick</span>
        <span>Built for CS project</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/threat-report" element={<ThreatReport />} />
      </Routes>
    </Router>
  );
}

export default App;
