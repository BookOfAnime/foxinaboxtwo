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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp': setDirection(prev => prev !== 'DOWN' ? 'UP' : prev); break;
        case 'ArrowDown': setDirection(prev => prev !== 'UP' ? 'DOWN' : prev); break;
        case 'ArrowLeft': setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev); break;
        case 'ArrowRight': setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);

    const moveSnake = () => {
      setFox(prevFox => {
        const newFox = [...prevFox];
        const head = { ...newFox[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        if (head.x < 0 || head.y < 0 || head.x >= CANVAS_SIZE.width / SCALE || head.y >= CANVAS_SIZE.height / SCALE) {
          setGameOver(true);
          return prevFox;
        }

        if (newFox.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevFox;
        }

        newFox.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 1);
          setFood({
            x: Math.floor(Math.random() * (CANVAS_SIZE.width / SCALE)),
            y: Math.floor(Math.random() * (CANVAS_SIZE.height / SCALE)),
          });
        } else {
          newFox.pop();
        }

        return newFox;
      });
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        moveSnake();
      }
    }, SPEED);

    const drawBackground = () => {
      context.fillStyle = '#7CFC00';
      context.fillRect(0, 0, CANVAS_SIZE.width / SCALE, CANVAS_SIZE.height / SCALE);

      context.fillStyle = '#90EE90';
      for (let i = 0; i < CANVAS_SIZE.width / SCALE; i++) {
        for (let j = 0; j < CANVAS_SIZE.height / SCALE; j++) {
          if ((i + j) % 2 === 0) {
            context.fillRect(i, j, 1, 1);
          }
        }
      }
    };

    const drawFox = (x, y, isHead) => {
      if (isHead) {
        context.fillStyle = '#FFA500';
        context.fillRect(x, y, 1, 1);

        context.fillStyle = 'black';
        context.fillRect(x + 0.2, y + 0.2, 0.2, 0.2);
        context.fillRect(x + 0.6, y + 0.2, 0.2, 0.2);

        context.fillStyle = 'black';
        context.fillRect(x + 0.4, y + 0.6, 0.2, 0.2);

        context.fillStyle = '#FF6347';
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - 0.3, y - 0.3);
        context.lineTo(x + 0.3, y - 0.3);
        context.fill();
      } else {
        context.fillStyle = '#FFA500';
        context.fillRect(x + 0.1, y + 0.1, 0.8, 0.8);
      }
    };

    const drawCardboardBox = (x, y) => {
      context.fillStyle = '#8B4513'; // Dark brown for the box
      context.fillRect(x, y, 1, 1);

      // Draw box flaps
      context.fillStyle = '#A0522D'; // Lighter brown for flaps
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + 0.5, y - 0.2);
      context.lineTo(x + 1, y);
      context.fill();

      // Draw box side
      context.fillStyle = '#D2691E'; // Medium brown for side
      context.fillRect(x + 0.8, y, 0.2, 1);
    };

    const draw = () => {
      context.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

      drawBackground();

      fox.forEach(({ x, y }, index) => drawFox(x, y, index === 0));

      drawCardboardBox(food.x, food.y);

      context.fillStyle = 'white';
      context.font = '1px Arial';
      context.fillText(`Score: ${score}`, 1, 1);

      if (gameOver) {
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, CANVAS_SIZE.width / SCALE, CANVAS_SIZE.height / SCALE);
        context.fillStyle = 'white';
        context.font = '2px Arial';
        context.fillText('Game Over!', 7, 10);
        context.fillText(`Score: ${score}`, 8, 12);
        context.font = '1px Arial';
        context.fillText('Press R to restart', 7, 14);
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => clearInterval(gameLoop);
  }, [fox, food, direction, gameOver, score]);

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

  useEffect(() => {
    const handleRestart = (e) => {
      if (e.key === 'r' && gameOver) {
        e.preventDefault();
        restartGame();
      }
    };

    window.addEventListener('keydown', handleRestart);
    return () => window.removeEventListener('keydown', handleRestart);
  }, [gameOver]);

  return (
    <section id="game" className="game-container">
      <h2 className="section-title">Fox Box Game</h2>
      <div 
        tabIndex="0" 
        onKeyDown={(e) => e.preventDefault()} 
        className="game-focus-container"
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE.width}
          height={CANVAS_SIZE.height}
          className="game-canvas"
        />
      </div>
      <p className="game-instructions">Use arrow keys to move the fox. Press R to restart after game over.</p>
    </section>
  );
};

export default FoxSnakeGame;