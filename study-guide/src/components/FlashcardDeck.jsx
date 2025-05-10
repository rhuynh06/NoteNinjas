import Flashcard from './Flashcard';

export default function FlashcardDeck({ cards }) {
  if (!cards.length) return null;

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <Flashcard key={idx} front={card.front} back={card.back} />
      ))}
    </div>
  );
}
