import React, { useState } from 'react';

const NoteInput = ({ onStudyGuideGenerated }) => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://q7jzcort01.execute-api.us-west-2.amazonaws.com'; // Replace with your actual URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',         // Optional: generally ignored by browsers
          'Access-Control-Allow-Methods': 'POST,OPTIONS', // Optional: ignored client-side
          'Access-Control-Allow-Headers': '*',        // Optional: ignored client-side
        },
        body: JSON.stringify({ notes }), // Only send notes
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      onStudyGuideGenerated(data);
    } catch (err) {
      console.error('Error generating study guide:', err);
      setError('Failed to generate study guide. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Enter Your Notes</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={10}
          cols={70}
          placeholder="Paste your school notes here..."
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Generating...' : 'Generate Study Guide'}
        </button>
      </form>
      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}
    </div>
  );
};

export default NoteInput;
