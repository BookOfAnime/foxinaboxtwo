import { useState, useEffect, useRef } from 'react';
import './App.css';
import FoxSnakeGame from './FoxGame';
import LandingPage from './LandingPage';
import MemeGallery from './MemeGallery';
import Navbar from './assets/Navbar';
import Tokenomics from './Tokenomics';

function App() {
  const [volume, setVolume] = useState(0.5); // Default volume level set to 50%
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playAudio = () => {
        audioRef.current.play().catch(err => console.error("Audio play error:", err));
      };
      playAudio();
    }
  }, [volume]);

  return (
    <>
      <Navbar />
      <LandingPage />
      <MemeGallery />
      <Tokenomics />
      <FoxSnakeGame />
      
      {/* Audio Player */}
      <audio ref={audioRef} src="/fox.mp3" loop />

      {/* Volume Control */}
      <div style={{ position: 'fixed', top: 10, right: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
        <label htmlFor="volume-slider">Volume: </label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </>
  );
}

export default App;
