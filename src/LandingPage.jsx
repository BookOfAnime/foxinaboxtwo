import React, { useEffect, useRef } from 'react';

const LandingPage = () => {
  const foxRef = useRef(null);

  useEffect(() => {
    const fox = foxRef.current;
    let position = 0;
    let direction = 1;

    const animateFox = () => {
      if (position > window.innerWidth - fox.offsetWidth) {
        direction = -1;
        fox.style.transform = 'scaleX(-1)';
      } else if (position < 0) {
        direction = 1;
        fox.style.transform = 'scaleX(1)';
      }
      position += direction * 2;
      fox.style.left = `${position}px`;
      requestAnimationFrame(animateFox);
    };

    animateFox();
  }, []);

  return (
    <section id="home" className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">
          <span className="title-word">Foxy</span>
          <span className="title-word">Memes</span>
        </h1>
        <p className="landing-subtitle">Where Wit Meets Whiskers</p>
        <a href="#gallery" className="cta-button">Explore Memes</a>
      </div>
      <img 
        ref={foxRef}
        src="/file.png" 
        alt="Animated Fox" 
        className="animated-fox"
        
      />
    </section>
  );
};

export default LandingPage;