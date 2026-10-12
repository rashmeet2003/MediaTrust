import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!text && !file) return alert('Please enter text or upload an image.');

    setLoading(true);
    const formData = new FormData();
    formData.append('text', text);
    if (file) formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      alert('Error connecting to backend API. Make sure FastAPI is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', fontFamily: 'sans-serif' }}>
      <header style={{ maxWidth: '800px', margin: '0 auto 32px auto', textAlign: 'center', borderBottom: '1px solid #334155', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px' }}>
          🛡️ SocialMediaContentCheck
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Explainable AI Framework for Social Media Content Provenance, Authenticity & Risk Assessment
        </p>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Input Form */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#e2e8f0' }}>Content Analyzer</h2>
          <form onSubmit={handleAnalyze}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#cbd5e1' }}>Social Media Post Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste post text or claims here..."
                style={{ width: '100%', height: '120px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#cbd5e1' }}>Upload Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ width: '100%', fontSize: '13px', color: '#94a3b8' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', fontWeight: '500', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              {loading ? 'Analyzing...' : '🔍 Analyze Content'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#e2e8f0' }}>Risk & XAI Report</h2>
            {response ? (
              <div>
                <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>Risk Level</p>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: response.risk_level === 'HIGH RISK' ? '#f87171' : response.risk_level === 'MEDIUM RISK' ? '#fbbf24' : '#34d399' }}>
                      {response.risk_level}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{response.risk_score}/100</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>Score Index</p>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>💡 Explainable AI (XAI) Rationale:</h3>
                  <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                    {response.explanations.map((reason, idx) => (
                      <li key={idx} style={{ fontSize: '13px', backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #334155', color: '#cbd5e1' }}>
                        • {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '14px', border: '2px dashed #334155', borderRadius: '8px', textAlign: 'center', padding: '16px' }}>
                <span style={{ fontSize: '28px', marginBottom: '8px' }}>📊</span>
                Submit content to view instant AI risk assessment & explanation.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}