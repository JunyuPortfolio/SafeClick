import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('url', url);
    if (file) formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/check', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ status: 'error', message: 'Something went wrong.' });
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔒 SafeClick URL Checker</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>Enter URL:</label><br />
          <input type="text" value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <label>Upload Screenshot:</label><br />
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Check Safety</button>
      </form>

      {result && (
        <div>
          <strong>Result:</strong> {result.message}
        </div>
      )}
      <section id="pricing-div">
        <h2>Pricing</h2>
        <div class="pricing-child">
          <h3>Free</h3>
          <p>URL Scan</p>
          <p>File Scan</p>
        </div>
        <div class="pricing-child">
          <p>Pro Plan: $20/month</p>
        </div>
        <div class="">  
          <p>Enterprise Plan: $50/month</p>
        </div>
      </section>
    </div>
  );
}

export default App;
