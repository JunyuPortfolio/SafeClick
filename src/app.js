import React, { useState } from 'react';
import './App.css';

function App() {
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
      {/* Hero Section */}
      <section className="hero">
        <div className="navbar">
          <div className="logo">safeclick.app</div>
          <button className="btn-outline">Pricing</button>
        </div>

        <h1>Worried about a sketchy site?</h1>
        <p>Paste the URL or insert the screenshot below to check if it's safe</p>

        {/* Input Form */}
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

        {/* Result */}
        {result && <p className="result">{result.message}</p>}
      </section>
    </div>
  );
}

export default App;
