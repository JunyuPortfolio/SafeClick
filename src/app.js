import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Pricing from './Pricing';
import ThreatReport from './ThreatReport';
import Terms from './Terms';
import './App.css';


function HomePage() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleCheck = (e) => {
    e.preventDefault(); // Prevent default form submission
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
        <Link className="pricing-button" to="/pricing">Pricing</Link>
      </header>

      <main className="main-content">
        <h1 className="main-title">Worried about a sketchy site?</h1>
        <p className="main-subtitle">
          Paste the URL or insert the screenshot below to check if it's safe
        </p>
        <form onSubmit={handleCheck} className="scan-form">
          <input
            className="input-box"
            type="text"
            placeholder="Paste a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            className="file-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button className="check-button" type="submit">
            🔍 Check Safety
          </button>
        </form>
      </main>

      <footer>
        <div className="footer-content">
          <p>© 2025 SafeClick</p>
          <Link to="/terms"><p>Terms of Service</p></Link>
          <p>Privacy Policy</p>
        </div>
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
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
