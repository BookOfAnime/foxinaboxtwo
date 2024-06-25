import React from 'react';

const Tokenomics = () => {
  const timeline = [
    { date: "2023 Q4", event: "Meme Token Launch", description: "Initial release of FoxyMeme tokens to the public." },
    { date: "2024 Q2", event: "Meme Contest", description: "Launch of beta version for buying and selling memes with FoxyMeme tokens." },
    { date: "2024 Q4", event: "DEX Pay", description: "Introduction of decentralized governance for community-driven decision making." },
    { date: "2025 Q2", event: "MOOOOOOOON!", description: "Diamond Hand." },
  ];

  return (
    <section id="tokenomics" className="tokenomics">
      <h2 className="section-title">Tokenomics Roadmap</h2>
      <div className="timeline">
        {timeline.map((item, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <div className="timeline-date">{item.date}</div>
              <h3 className="timeline-event">{item.event}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tokenomics;