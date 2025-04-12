import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pricing from './Pricing'; // ✅ default import
import './App.css';

function Home() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

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
      setResult(data);
    } catch (err) {
      setResult({ message: 'Error checking URL.' });
    }
  };

  return (
    <div className="app">
      <section className="hero">
        <div className="navbar">
          <div className="logo">safeclick.app</div>
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

        {result && <p className="result">{result.message}</p>}
      </section>
      <footer>
        <div className="footer-content">
          <p>© 2023 safeclick.app</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
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
      </Routes>
    </Router>
  );
}

export default App;
