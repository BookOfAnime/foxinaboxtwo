import React from 'react';

const Tokenomics = () => {
  const timeline = [
    { date: "2023 Q4", event: "Meme Token Launch" },
    { date: "2024 Q2", event: "Meme Marketplace Release" },
    { date: "2024 Q4", event: "Meme DAO Formation" },
  ];

  return (
    <section id="tokenomics" className="tokenomics">
      <h2 className="section-title">Tokenomics</h2>
      <div className="timeline">
        {timeline.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-event">{item.event}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tokenomics;