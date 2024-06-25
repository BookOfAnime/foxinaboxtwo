import React from 'react';

const MemeGallery = () => {
  const memes = [
    { id: 1, src: "/ted.jpeg", alt: "Funny meme 1" },
    { id: 2, src: "/weed.jpeg", alt: "Funny meme 2" },
    { id: 3, src: "/stocks.jpeg", alt: "Funny meme 3" },
    { id: 4, src: "/pox.jpeg", alt: "Funny meme 4" },
    { id: 5, src: "/space.jpeg", alt: "Funny meme 5" },
    { id: 6, src: "/mol.jpeg", alt: "Funny meme 6" },
    { id: 7, src: "/whiskey.jpeg", alt: "Funny meme 7" },
    { id: 8, src: "/wif.jpeg", alt: "Funny meme 8" },
    { id: 9, src: "/mox.jpeg", alt: "Funny meme 8" }
  ];

  return (
    <section id="gallery" className="meme-gallery">
      <h2 className="section-title">Funny Meme Gallery</h2>
      <div className="meme-grid">
        {memes.map((meme) => (
          <div key={meme.id} className="meme-item">
            <img src={meme.src} alt={meme.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemeGallery;