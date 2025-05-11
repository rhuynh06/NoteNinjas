import { useState } from 'react';

export default function Flashcards({ data }) {
  const cards = [
    ...data.terms.map(t => ({ front: t.term, back: t.definition })),
    ...data.questions.map(q => ({ front: q.question, back: q.answer }))
  ];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setIndex((index + 1) % cards.length);
    setFlipped(false);
  };

  const prev = () => {
    setIndex((index - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">🃏 Flashcards</h2>
      <div
        className="border p-4 rounded shadow mb-2 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        {flipped ? cards[index].back : cards[index].front}
      </div>
      <div className="space-x-2">
        <button onClick={prev} className="px-4 py-1 bg-gray-300 rounded">←</button>
        <button onClick={next} className="px-4 py-1 bg-gray-300 rounded">→</button>
      </div>
    </div>
  );
}