import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Pricing from './Pricing';
import './App.css';
import Terms from './Terms';

function Home() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('url', url);
    if (file) formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/check', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      navigate('/threat-report', { state: { result: data } });
    } catch (err) {
      console.error(err);
      navigate('/threat-report', {
        state: {
          result: {
            message: 'Error checking URL.',
            score: 0,
            fact: 'Phishing costs organizations billions each year.',
          },
        },
      });
    }
  };

  return (
    <div className="app">
      <section className="hero">
        <div className="navbar">
          <h2 style={{ fontWeight: 'bold' }}>Safe Click</h2>
          <Link to="/pricing" className="btn-outline">Pricing</Link>
        </div>

        <h1>Worried about a sketchy site?</h1>
        <p>Paste the URL or insert the screenshot below to check if it's safe</p>

        <form onSubmit={handleSubmit} className="scan-form">
          <input
            type="text"
            placeholder="Paste a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">🔍 Check Safety</button>
        </form>
      </section>
      <footer>
        <div className="footer-content">
          <p>© 2023 safeclick</p>
          <Link to="/Terms"><p>Terms of Service</p></Link>
          <a>Terms of Service</a>
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
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/threat-report" element={<ThreatReport />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;

import ThreatReport from './ThreatReport';
