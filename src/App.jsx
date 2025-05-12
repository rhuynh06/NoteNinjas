import { useState, useEffect, useRef } from 'react';
import FlashcardDeck from './components/FlashcardDeck.jsx';
import TxtFileUploader from './components/TxtFileUploader.jsx';
import cpy from './assets/cpy.png';
import light from './assets/light.png';
import dark from './assets/dark.png';
import logo_light from './assets/logo_light.png';
import logo_dark from './assets/logo_dark.png';
import rewind from './assets/rewind.png';
import forward from './assets/forward.png';
import play from './assets/play.png';

const API_URL = 'https://q7jzcort01.execute-api.us-west-2.amazonaws.com/invoke';

function App() {
  const [input, setInput] = useState("");
  const [studyGuide, setStudyGuide] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isPlaying, setIsPlaying] = useState(false);

  const studyGuideRef = useRef(null);
  const audioRef = useRef(null);

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

  const handleSpeak = async () => {
    if (!studyGuide) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "speak",
          text: studyGuide
        })
      });

      const data = await res.json();

      if (data.audio_base64) {
        const mp3 = "data:audio/mp3;base64," + data.audio_base64;
        if (audioRef.current) {
          audioRef.current.src = mp3;
          audioRef.current.play().catch(err => {
            console.error("Autoplay error:", err);
          });
        }
      } else {
        throw new Error("No audio returned");
      }
    } catch (err) {
      console.error("TTS error:", err);
      alert("Text-to-speech failed.");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

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

  const renderStudyGuide = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) return <h1 key={idx}>{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx}>{line.slice(3)}</h2>;
      if (line.startsWith('• ')) return <li key={idx}>{line.slice(2)}</li>;
      if (line.trim() === '') return <br key={idx} />;
      return <p key={idx}>{line}</p>;
    });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={theme === "light" ? logo_light : logo_dark} style={{ width: '45%', height: 'auto' }} />
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
          {theme === "light" ? (<img src={dark} width="50" height="auto" />) : (<img src={light} width="50" height="auto" />)}
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
          <div className="study-guide-top">

            <button className="sound-btn" style={{ padding: '5px 10px' }} onClick={handleSpeak}>Read Aloud</button>

            <audio ref={audioRef} style={{ display: 'none' }} />

            <button className="sound-btn"
            onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}>
              <img style={{ border: 'none' }} src={rewind}/>
            </button>

            <button className="sound-btn"
              onClick={() => {
                if (!audioRef.current) return;
                if (audioRef.current.paused) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }}>
              <img style={{ border: 'none' }} src={play}/>
            </button>

            <button className="sound-btn"
              onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}>
              <img style={{ border: 'none' }} src={forward}/>
            </button>


            <button className="copy-btn" style={{ padding: '5px'}} onClick={handleCopy}>
              <img style={{ border: 'none' }} src={cpy} width='25px' height='auto' />
            </button>
          </div>
            

          {renderStudyGuide(studyGuide)}
        </div>
      )}
    </div>
  );
}

export default App;
