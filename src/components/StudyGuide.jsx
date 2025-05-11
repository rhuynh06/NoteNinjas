export default function StudyGuide({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4 my-6">
        <div>
          <h2 className="text-xl font-semibold">📘 Terms & Questions</h2>
          <ul>
            {data.terms.map((t, i) => <li key={i}>{t.term}</li>)}
            {data.questions.map((q, i) => <li key={`q-${i}`}>{q.question}</li>)}
          </ul>
        </div>
      <div>
        <h2 className="text-xl font-semibold">📝 Definitions & Answers</h2>
        <ul>
          {data.terms.map((t, i) => <li key={i}>{t.definition}</li>)}
          {data.questions.map((q, i) => <li key={`a-${i}`}>{q.answer}</li>)}
        </ul>
      </div>
    </div>
  );
}