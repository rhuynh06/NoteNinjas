import { useState, useEffect, useRef } from 'react';
import FlashcardDeck from './components/FlashcardDeck.jsx';
import TxtFileUploader from './components/TxtFileUploader.jsx';
import cpy from './assets/cpy.png';
import light from './assets/light.png';
import dark from './assets/dark.png';
import logo_light from './assets/logo_light.png';
import logo_dark from './assets/logo_dark.png';

const API_URL = 'https://q7jzcort01.execute-api.us-west-2.amazonaws.com/invoke'

function App() {
  const [input, setInput] = useState("");
  const [studyGuide, setStudyGuide] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const studyGuideRef = useRef(null);

  const handleCopy = () => {
    if (studyGuideRef.current) {
      const text = studyGuideRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("Study guide copied to clipboard!");
      }).catch(err => {
        console.error("Copy failed", err);
      });
    }
  };


  const renderStudyGuide = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) return <h1 key={idx}>{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx}>{line.slice(3)}</h2>;
      if (line.startsWith('• ')) return <li key={idx}>{line.slice(2)}</li>;
      if (line.trim() === '') return <br key={idx} />;
      return <p key={idx}>{line}</p>;
    });
  };

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
        <img src={theme === "light" ? logo_light : logo_dark} style={{ width: '45%', height: 'auto' }}/>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '0', display: 'flex', alignItems: 'center',}}>
          {theme === "light" ? (<img src={dark} width="50" height="auto"/>)
          : (<img src={light} width="50" height="auto"/>)}
        </button>
      </div>

      <textarea
        placeholder="Paste your notes here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TxtFileUploader setInput={setInput} />
        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Study Guide"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flashcard-grid">
        <FlashcardDeck cards={flashcards} />
      </div>

        {studyGuide && (
        <div className="study-guide" ref={studyGuideRef}>
          <button className="generate-btn copy-btn" style={{padding:'5px'}} onClick={handleCopy}>
            <img style={{border:'none'}} src={cpy} width='25px' height='auto'/>
          </button>
          {renderStudyGuide(studyGuide)}
        </div>
        )}

    </div>
  );
}

export default App;