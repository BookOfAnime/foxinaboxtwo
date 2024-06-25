import React, { useState, useEffect, useRef } from 'react';

const FoxSnakeGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [fox, setFox] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');

  const CANVAS_SIZE = { width: 400, height: 400 };
  const SCALE = 20;
  const SPEED = 100;

  // Sound effects
  const moveSound = new Audio('/path-to-your-move-sound.mp3');
  const eatSound = new Audio('/crunch.mp3');
  const gameOverSound = new Audio('/die.mp3');

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);

    if (!gameOver) {
      const moveSnake = () => {
        setFox((prevFox) => {
          const newFox = [...prevFox];
          const head = { ...newFox[0] };

          switch (direction) {
            case 'UP':
              head.y -= 1;
              break;
            case 'DOWN':
              head.y += 1;
              break;
            case 'LEFT':
              head.x -= 1;
              break;
            case 'RIGHT':
              head.x += 1;
              break;
          }

          // Check collisions
          if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= CANVAS_SIZE.width / SCALE ||
            head.y >= CANVAS_SIZE.height / SCALE ||
            newFox.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
          ) {
            setGameOver(true);
            gameOverSound.play();
            return prevFox;
          }

          newFox.unshift(head);

          if (head.x === food.x && head.y === food.y) {
            setScore((prevScore) => prevScore + 1);
            eatSound.play();
            setFood({
              x: Math.floor(Math.random() * (CANVAS_SIZE.width / SCALE)),
              y: Math.floor(Math.random() * (CANVAS_SIZE.height / SCALE)),
            });
          } else {
            newFox.pop();
          }

          moveSound.play();
          return newFox;
        });
      };

      const gameLoop = setInterval(moveSnake, SPEED);
      return () => clearInterval(gameLoop);
    }
  }, [direction, gameOver]);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

    // Draw fox
    fox.forEach(({ x, y }, index) => {
      if (index === 0) {
        // Draw fox head
        context.fillStyle = '#FFA500';
        context.fillRect(x, y, 1, 1);
        
        // Draw eyes
        context.fillStyle = 'black';
        context.fillRect(x + 0.2, y + 0.2, 0.2, 0.2);
        context.fillRect(x + 0.6, y + 0.2, 0.2, 0.2);
        
        // Draw nose
        context.fillStyle = 'black';
        context.fillRect(x + 0.4, y + 0.6, 0.2, 0.2);
        
        // Draw ears
        context.fillStyle = '#FF6347';
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - 0.3, y - 0.3);
        context.lineTo(x + 0.3, y - 0.3);
        context.fill();
      } else {
        // Draw body
        context.fillStyle = index % 2 === 0 ? '#FFA500' : '#FF8C00';
        context.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);
      }
    });

    // Draw food (cardboard box)
    context.fillStyle = '#8B4513';
    context.fillRect(food.x, food.y, 1, 1);
    context.fillStyle = '#D2691E';
    context.fillRect(food.x, food.y, 0.9, 0.2);

    // Draw score
    context.fillStyle = 'black';
    context.font = '1px Arial';
    context.fillText(`Score: ${score}`, 1, 1);
  }, [fox, food, score]);

  const handleKeyPress = (dir) => {
    if (!gameOver) {
      switch (dir) {
        case 'UP':
          setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
          break;
        case 'DOWN':
          setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
          break;
        case 'LEFT':
          setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
          break;
        case 'RIGHT':
          setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp':
          handleKeyPress('UP');
          break;
        case 'ArrowDown':
          handleKeyPress('DOWN');
          break;
        case 'ArrowLeft':
          handleKeyPress('LEFT');
          break;
        case 'ArrowRight':
          handleKeyPress('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setFox([{ x: 10, y: 10 }]);
    setFood({
      x: Math.floor(Math.random() * (CANVAS_SIZE.width / SCALE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE.height / SCALE)),
    });
    setDirection('RIGHT');
  };

  return (
    <section id="game" className="game-container">
      <h2 className="section-title">Fox Box Game</h2>
      <div className="game-area">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE.width}
            height={CANVAS_SIZE.height}
            className="game-canvas"
          />
          {gameOver && (
            <div className="game-over-overlay">
              <h3>Game Over!</h3>
              <p>Score: {score}</p>
              <button onClick={restartGame}>Restart</button>
            </div>
          )}
        </div>
        <div className="game-controls">
          <button className="control-btn up" onClick={() => handleKeyPress('UP')}>↑</button>
          <div className="horizontal-controls">
            <button className="control-btn left" onClick={() => handleKeyPress('LEFT')}>←</button>
            <button className="control-btn right" onClick={() => handleKeyPress('RIGHT')}>→</button>
          </div>
          <button className="control-btn down" onClick={() => handleKeyPress('DOWN')}>↓</button>
        </div>
      </div>
      <p className="game-instructions">Use arrow keys or buttons to move the fox. Collect boxes to score!</p>
    </section>
  );
};

export default FoxSnakeGame;