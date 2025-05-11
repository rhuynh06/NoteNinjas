import { useState } from 'react';

function Flashcard({ question, answer, flipped, onFlip }) {
  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">{question}</div>
        <div className="flashcard-back">{answer}</div>
      </div>
    </div>
  );
}

function FlashcardDeck({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return <p>No flashcards available. Paste notes and click Generate.</p>;
  }

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[index];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <button onClick={prevCard}>←</button>
      <Flashcard
        question={currentCard.question || currentCard.front || "Missing question"}
        answer={currentCard.answer || currentCard.back || "Missing answer"}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
      />
      <button onClick={nextCard}>→</button>
    </div>
  );
}

export default FlashcardDeck;
