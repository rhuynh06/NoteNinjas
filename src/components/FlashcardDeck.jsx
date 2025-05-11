import { useState } from 'react';

function Flashcard({ question, answer, flipped, onFlip, count, total }) {
  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="flashcard-counter">{count} / {total}</div>
          {question}
        </div>
        <div className="flashcard-back">
          <div className="flashcard-counter">{count} / {total}</div>
          {answer}
        </div>
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
  const total = cards.length; // Total number of cards

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <button className='arrows' onClick={prevCard}>←</button>
      <Flashcard
        question={currentCard.question || currentCard.front || "Missing question"}
        answer={currentCard.answer || currentCard.back || "Missing answer"}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
        count={index + 1}
        total={total}
      />
      <button className='arrows' onClick={nextCard}>→</button>
    </div>
  );
}

export default FlashcardDeck;
