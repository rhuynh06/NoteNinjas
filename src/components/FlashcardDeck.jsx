import { useState } from 'react';

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="front">
        {question}
      </div>
      <div className="back">
        {answer}
      </div>
    </div>
  );
}

function FlashcardDeck({ cards }) {
  if (!cards || cards.length === 0) {
    return <p>No flashcards available. Paste notes and click Generate.</p>;
  }

  return (
    <>
      {cards.map((card, idx) => (
        <Flashcard
          key={idx}
          question={card.question || card.front || "Missing question"}
          answer={card.answer || card.back || "Missing answer"}
        />
      ))}
    </>
  );
}

export default FlashcardDeck;
