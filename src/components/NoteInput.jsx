import React, { useState } from 'react';

const NoteInput = ({ onStudyGuideGenerated, loading }) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.trim()) {
      onStudyGuideGenerated(notes);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-input">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        cols={70}
        placeholder="Paste your school notes here..."
        className="textarea"
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Study Guide"}
      </button>
    </form>
  );
};

export default NoteInput;
