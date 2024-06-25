import React from 'react';

const MemeGallery = () => {
  const memes = [
    { id: 1, src: "/ted.jpeg", alt: "Funny meme 1", title: "Ted Talks Fox in Box" },
    { id: 2, src: "/weed.jpeg", alt: "Funny meme 2", title: "Hot Box Fox in Box" },
    { id: 3, src: "/stocks.jpeg", alt: "Funny meme 3", title: "Stocks Fox in Box"},
    { id: 4, src: "/pox.jpeg", alt: "Funny meme 4", title: "Pox Fox in Box" },
    { id: 5, src: "/mol.jpeg", alt: "Funny meme 5", title:"Molly Rocs Fox in Box" },
    { id: 6, src: "/york.jpeg", alt: "Funny meme 6", title: "Milly Rock Fox in Box" },
    { id: 7, src: "/jamaca.jpeg", alt: "Funny meme 7", title: "Dreadlocks Fox in Box" },
    { id: 8, src: "/whiskey.jpeg", alt: "Funny meme 8", title: "On the Rocks Fox in Box" },
    { id: 9, src: "/mox.jpeg", alt: "Funny meme 8" },
    { id: 10, src:"./space.jpeg", alt:"ereare", title:"Spaces Rocks Fox in Box"}
  ];

  return (
    <section id="gallery" className="meme-gallery">
      <h2 className="section-title">The Foxes in Boxes Gang</h2>
      <div className="meme-grid">
        {memes.map((meme) => (
          <div key={meme.id} className="meme-card">
            <div className="meme-image-container">
              <img src={meme.src} alt={meme.alt} className="meme-image" />
            </div>
            <h3 className="meme-title">{meme.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemeGallery;