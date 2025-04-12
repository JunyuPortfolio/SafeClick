import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Pricing from './Pricing';
import ThreatReport from './ThreatReport';
import Terms from './Terms';
import './App.css';

// ================== HomePage Component ==================
function HomePage() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Automatically add http:// if missing
  const normalizeUrl = (inputUrl) => {
    if (!/^https?:\/\//i.test(inputUrl)) {
      return 'http://' + inputUrl;
    }
    return inputUrl;
  };

  const handleCheck = async (e) => {
    e.preventDefault();

    let result = null;
    const trimmedUrl = url.trim();
    const hasUrl = trimmedUrl !== '';
    const hasFile = file !== null;

    try {
      if (hasUrl) {
        const normalized = normalizeUrl(trimmedUrl);

        const response = await fetch("http://127.0.0.1:5000/api/check_url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: normalized }),
        });

        result = await response.json();
      } else if (hasFile) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:5000/api/upload_image", {
          method: "POST",
          body: formData,
        });

        result = await response.json();
      } else {
        alert("Please enter a valid URL or upload an image.");
        return;
      }

      navigate('/threat-report', {
        state: {
          confidence: result.confidence || 0,
          report: result.report || "No report generated.",
        },
      });

    } catch (error) {
      console.error("Error checking URL or file:", error);
      alert("There was an error checking the input. Please try again.");
    }
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
            placeholder="Paste a URL (e.g. google.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button className="check-button" type="submit">
            🔍 Check Safety
          </button>
        </form>
        <small style={{ color: '#888' }}>
          Tip: You can enter “example.com” and we’ll handle the rest.
        </small>
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

// ================== App Component ==================
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
