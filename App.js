import React, { useEffect, useState } from "react";

const App = () => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleClick = () => {
    if (gameOver) return;
    setScore((prev) => prev + 1);
    setPosition({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    });
  };

  const handleReset = () => {
    setScore(0);
    setPosition({ top: "50%", left: "50%" });
    setTimeLeft(10);
    setGameOver(false);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <style>
        {`
          .clickable-box {
            width: 100px;
            height: 100px;
            background-color: blue;
            border-radius: 50%;
            position: absolute;
            border: 4px solid white;
            transition: transform 0.2s ease-in-out;
          }

          .clickable-box:hover {
            transform: scale(1.1);
            background-color: darkblue;
          }

          .game-over-text {
            font-size: 24px;
            font-weight: bold;
            color: black;
          }

          .reset-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 18px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .reset-button:hover {
            background-color: #218838;
          }
        `}
      </style>

      {!gameOver ? (
        <>
          <button
            onClick={handleClick}
            className="clickable-box"
            style={{ top: position.top, left: position.left }}
          ></button>
          <h1>Time Left: {timeLeft}s</h1>
          <h2>Score: {score}</h2>
        </>
      ) : (
        <div className="text-center">
          <h1 className="game-over-text">Game Over! Score: {score}</h1>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default App;
