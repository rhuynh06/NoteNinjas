import { useState, useEffect } from 'react';
import FlashcardDeck from './components/FlashcardDeck.jsx';
import TxtFileUploader from './components/TxtFileUploader.jsx';

const API_URL = "https://q7jzcort01.execute-api.us-west-2.amazonaws.com/invoke";

function App() {
  const [input, setInput] = useState("");
  const [studyGuide, setStudyGuide] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>AI Study Guide Generator</h1>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '0', display: 'flex', alignItems: 'center',}}>
          {theme === "light" ? (<img src="dark.png" width="50" height="auto"/>)
          : (<img src="light.png" width="50" height="auto"/>)}
        </button>
      </div>

      <textarea
        placeholder="Paste your notes here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TxtFileUploader setInput={setInput} />
        <button class='generate-btn' onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Study Guide"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flashcard-grid">
        <FlashcardDeck cards={flashcards} />
      </div>

      {studyGuide && (
        <div className="study-guide">
          <h2>AI-Generated Study Guide:</h2>
          {(studyGuide)}
        </div>
      )}
    </div>
  );
}

export default App;