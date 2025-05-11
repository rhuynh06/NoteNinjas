import { useState } from 'react';
import FlashcardDeck from './components/FlashcardDeck.jsx';

const API_URL = "https://q7jzcort01.execute-api.us-west-2.amazonaws.com/invoke";

function App() {
  const [input, setInput] = useState("");              // ← Added input state
  const [studyGuide, setStudyGuide] = useState("");    // ← Added studyGuide state
  const [flashcards, setFlashcards] = useState([]);    // ← Added flashcards state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputText: input })
      });

      const data = await res.json();

      setStudyGuide(data.study_guide || "No study guide returned.");
      setFlashcards(data.flashcards || []);

    } catch (err) {
      console.error("API error:", err);
      setError("Failed to generate study guide.");
      setStudyGuide("Error generating study guide.");
      setFlashcards([]);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Study Guide Generator</h1>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Paste your notes here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Study Guide"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flashcard-grid mb-6">
        <FlashcardDeck cards={flashcards} />
      </div>

      {studyGuide && (
        <div className="study-guide">
          <h2 className="text-xl font-semibold mb-2">AI-Generated Study Guide:</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{studyGuide}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
