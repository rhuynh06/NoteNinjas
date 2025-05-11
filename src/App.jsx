import { useState } from 'react';
import NoteInput from './components/NoteInput';
import StudyGuide from './components/StudyGuide';
import Flashcards from './components/Flashcards';

const API_URL = "https://q7jzcort01.execute-api.us-west-2.amazonaws.com/invoke";

function App() {
  const [studyData, setStudyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStudyGuideGenerated = async (notes) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notes }) // Match with expected Lambda key
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setStudyData(data);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to generate study guide. Please try again.");
      setStudyData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">AI Study Guide Generator</h1>

      <NoteInput onStudyGuideGenerated={handleStudyGuideGenerated} loading={loading} />

      {error && <p className="error-message">{error}</p>}

      {studyData && (
        <>
          <StudyGuide data={studyData} />
          <Flashcards data={studyData} />
        </>
      )}
    </div>
  );
}

export default App;
