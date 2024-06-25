import React from 'react';
import { Rocket, Award, CreditCard, Moon } from 'lucide-react';

const Tokenomics = () => {
  const timeline = [
    { date: "2023 Q4", event: "Meme Token Launch", description: "Initial release of FoxyMeme tokens to the public.", icon: <Rocket /> },
    { date: "2024 Q2", event: "Meme Contest", description: "Launch of beta version for buying and selling memes with FoxyMeme tokens.", icon: <Award /> },
    { date: "2024 Q4", event: "DEX Pay", description: "Introduction of decentralized governance for community-driven decision making.", icon: <CreditCard /> },
    { date: "2025 Q2", event: "MOOOOOOOON!", description: "Diamond Hand.", icon: <Moon /> },
  ];

  return (
    <section id="tokenomics" className="tokenomics">
      <h2 className="section-title">Tokenomics Roadmap</h2>
      <div className="roadmap-container">
        {timeline.map((item, index) => (
          <div key={index} className="roadmap-card">
            <div className="roadmap-icon">{item.icon}</div>
            <div className="roadmap-content">
              <h3 className="roadmap-event">{item.event}</h3>
              <div className="roadmap-date">{item.date}</div>
              <p className="roadmap-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tokenomics;