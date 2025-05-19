
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('audio', file);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setSummary(res.data.summary);
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Voice Inbox – Call Summarizer</h1>
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpload}>
        {loading ? 'Processing...' : 'Upload & Summarize'}
      </button>
      {summary && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
