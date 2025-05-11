import { useState } from 'react';
import FlashcardDeck from './components/FlashcardDeck';

// 🔁 Mock AI function
function generateStudyGuide(text) {
  const summary = `Study Guide for: ${text.substring(0, 50)}...`;

  const cards = [
    { front: 'Key Concept 1', back: 'Explanation of concept 1' },
    { front: 'Key Concept 2', back: 'Explanation of concept 2' },
    { front: 'Key Concept 3', back: 'Explanation of concept 3' },
  ];

  return { summary, flashcards: cards };
}

function App() {
  const [input, setInput] = useState('');
  const [studyGuide, setStudyGuide] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = () => {
    const { summary, flashcards } = generateStudyGuide(input);
    setStudyGuide(summary);
    setFlashcards(flashcards);
  };

  return (
    <div className="container">
      <h1>AI Study Guide Generator</h1>

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
          <p>{studyGuide}</p>
        </div>
      )}
  </div>
  );
}

export default App;
