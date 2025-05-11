import { useState } from 'react';
import FlashcardDeck from './components/FlashcardDeck';

// 🔁 Replace this with your real API URL
const API_URL = "https://q7jzcort01.execute-api.us-west-2.amazonaws.com/invoke";

function App() {
  const [studyData, setStudyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputText: input })
      });

      const data = await res.json();

      // ✅ Adjust these keys to match your Lambda response
      setStudyGuide(data.study_guide || "No study guide returned.");
      setFlashcards(data.flashcards || []);
    } catch (err) {
      console.error("API error:", err);
      setStudyGuide("Error generating study guide.");
      setFlashcards([]);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">AI Study Guide Generator</h1>

      <textarea
        placeholder="Paste your notes here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate Study Guide</button>

      <div className="flashcard-grid">
        <FlashcardDeck cards={flashcards} />
      </div>

      {studyGuide && (
        <div className="study-guide">
          <h2>AI-Generated Study Guide:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{studyGuide}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
