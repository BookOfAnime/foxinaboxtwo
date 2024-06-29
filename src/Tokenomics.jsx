import React from 'react';
import { Rocket, Award, CreditCard, Moon } from 'lucide-react';

const Tokenomics = () => {
  const timeline = [
    { date: "First", event: "Meme Token Launch", description: "1 Billion Supply is launched fairly on Pump.Fun", icon: <Rocket /> },
    { date: "Second", event: "Meme Contest", description: "Buy Tax 0%, Sell Tax 0% .", icon: <Award /> },
    { date: "Third", event: "DEX Pay", description: "Paid Trendings starting with Dex!", icon: <CreditCard /> },
    { date: "Blast Off", event: "MOOOOOOOON!", description: "Diamond Hand. Meme Contest and community events", icon: <Moon /> },
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