import { useState } from 'react';
import NoteInput from './components/NoteInput';
import StudyGuide from './components/StudyGuide';
import Flashcards from './components/FlashCards';
import './App.css';

function App() {
  const [studyData, setStudyData] = useState(null);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Study Guide Generator</h1>
      <NoteInput onResult={setStudyData} />
      {studyData && (
        <>
          <StudyGuide data={studyData} />
          <Flashcards data={studyData} />
        </>
      )}
    </div>
  );
}

export default App;