import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Point, Direction } from '../types';
import PixelButton from './PixelButton';
import { Play, RotateCcw, Trophy, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Gift, PartyPopper } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const WINNING_SCORE = 300; // 10 items x 30 points

const SnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5 },
    score: 0,
    gameOver: false,
    isPlaying: false,
    highScore: 0,
    victory: false
  });
  
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const directionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<number | null>(null);

  // Sync ref with state
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = (snake: Point[]): Point => {
    let newFood;
    let isOnSnake;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // eslint-disable-next-line no-loop-func
      isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);
    return newFood;
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      snake: [{ x: 10, y: 10 }],
      food: generateFood([{ x: 10, y: 10 }]),
      score: 0,
      gameOver: false,
      isPlaying: true,
      victory: false
    }));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameState.isPlaying) return;
    
    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (directionRef.current !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (directionRef.current !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (directionRef.current !== 'LEFT') setDirection('RIGHT');
        break;
    }
  }, [gameState.isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const moveSnake = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    setGameState(prev => {
      const newHead = { ...prev.snake[0] };

      switch (directionRef.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collision with walls
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE
      ) {
        return { ...prev, gameOver: true, isPlaying: false, victory: false, highScore: Math.max(prev.highScore, prev.score) };
      }

      // Check collision with self
      if (prev.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        return { ...prev, gameOver: true, isPlaying: false, victory: false, highScore: Math.max(prev.highScore, prev.score) };
      }

      const newSnake = [newHead, ...prev.snake];
      let newScore = prev.score;
      let newFood = prev.food;

      // Check food
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newScore += 30; // Special Birthday Score increment for age 30
        
        // WIN CONDITION
        if (newScore >= WINNING_SCORE) {
             return {
                ...prev,
                snake: newSnake,
                score: newScore,
                gameOver: true,
                isPlaying: false,
                victory: true,
                highScore: Math.max(prev.highScore, newScore)
             };
        }

        newFood = generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return {
        ...prev,
        snake: newSnake,
        score: newScore,
        food: newFood
      };
    });
  }, [gameState.isPlaying, gameState.gameOver]);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      const speed = Math.max(50, INITIAL_SPEED - Math.floor(gameState.score / 100) * 10);
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState.isPlaying, gameState.gameOver, gameState.score, moveSnake]);

  // Mobile controls
  const handleMobileControl = (dir: Direction) => {
    if (!gameState.isPlaying) return;
    if (dir === 'UP' && directionRef.current !== 'DOWN') setDirection('UP');
    if (dir === 'DOWN' && directionRef.current !== 'UP') setDirection('DOWN');
    if (dir === 'LEFT' && directionRef.current !== 'RIGHT') setDirection('LEFT');
    if (dir === 'RIGHT' && directionRef.current !== 'LEFT') setDirection('RIGHT');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 border-4 border-gray-700 bg-black rounded-lg shadow-2xl relative">
      <div className={`absolute -top-6 ${gameState.victory ? 'bg-yellow-500 border-yellow-700 text-black' : 'bg-red-600 border-red-800 text-white'} px-4 py-1 text-xs uppercase tracking-widest border-2 animate-pulse transition-colors duration-500`}>
        {gameState.victory ? '★ WINNER ★' : 'Dingdong Arcade'}
      </div>

      <div className="flex justify-between w-full mb-4 px-4 text-green-400 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
           <span>SCORE: {gameState.score.toString().padStart(5, '0')}</span>
           <span className="text-[10px] text-gray-500">/ {WINNING_SCORE}</span>
        </div>
        <div className="flex items-center gap-2">
           <Trophy size={16} className="text-yellow-400" />
           <span>HIGH: {gameState.highScore.toString().padStart(5, '0')}</span>
        </div>
      </div>

      <div 
        className="relative bg-gray-900 border-4 border-green-900"
        style={{
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '1/1',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {!gameState.isPlaying && !gameState.gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-center p-4">
            <h3 className="text-green-500 mb-4 text-sm sm:text-lg">RANGER QUEST</h3>
            <p className="text-gray-400 text-xs mb-2">Eat 10 Energy Orbs</p>
            <p className="text-blue-400 text-[10px] mb-6">Target: {WINNING_SCORE} Points</p>
            <PixelButton onClick={startGame}>INSERT COIN</PixelButton>
          </div>
        )}

        {gameState.gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-20 text-center p-6 border-4 border-double border-white m-2">
            
            {gameState.victory ? (
               // WIN STATE
               <div className="animate-bounce">
                  <PartyPopper className="text-yellow-400 w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-yellow-400 mb-2 text-lg sm:text-xl">MISSION COMPLETE!</h3>
                  <p className="text-green-400 text-xs mb-4">LEVEL 30 UNLOCKED</p>
                  <p className="text-white text-[10px] mb-6 leading-relaxed">
                    Amazing reflexes, Ranger! <br/>
                    You have successfully navigated another year.<br/>
                    <span className="text-pink-400">HAPPY BIRTHDAY AXCELL! 🎂</span>
                  </p>
               </div>
            ) : (
                // LOSE STATE
               <div>
                  <Gift className="text-red-500 w-12 h-12 mx-auto mb-2 animate-pulse" />
                  <h3 className="text-blue-400 mb-2 text-lg">SURPRISE!</h3>
                  <p className="text-gray-400 text-[10px] mb-4">GAME OVER?</p>
                  <p className="text-white text-[10px] mb-6 leading-relaxed max-w-[250px] mx-auto">
                    Even when you hit a wall, you're still a winner to us!<br/>
                    Don't give up on Level 30.<br/>
                    <span className="text-yellow-400">Keep shining, Birthday Boy! ✨</span>
                  </p>
               </div>
            )}

            <PixelButton onClick={startGame} variant={gameState.victory ? "blue" : "secondary"}>
              <RotateCcw className="mr-2 h-4 w-4 inline" /> {gameState.victory ? "PLAY AGAIN" : "TRY AGAIN"}
            </PixelButton>
          </div>
        )}

        {/* Grid Render */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          
          const isSnakeHead = gameState.snake[0]?.x === x && gameState.snake[0]?.y === y;
          const isSnakeBody = gameState.snake.some((s, idx) => idx !== 0 && s.x === x && s.y === y);
          const isFood = gameState.food.x === x && gameState.food.y === y;

          let cellClass = "border border-gray-800/30 "; // faint grid
          
          if (isSnakeHead) cellClass = "bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"; // Blue Ranger Head
          else if (isSnakeBody) cellClass = "bg-blue-700 rounded-sm opacity-90"; // Blue Ranger Body
          else if (isFood) cellClass = "bg-yellow-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(250,204,21,0.8)]"; // Coin/Energy

          return <div key={i} className={cellClass}></div>;
        })}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 mt-6 sm:hidden w-full max-w-[200px]">
        <div />
        <button 
          className="bg-gray-800 active:bg-gray-700 p-4 rounded border-b-4 border-gray-950 flex justify-center"
          onPointerDown={(e) => { e.preventDefault(); handleMobileControl('UP'); }}
        >
          <ChevronUp className="text-white" />
        </button>
        <div />
        <button 
          className="bg-gray-800 active:bg-gray-700 p-4 rounded border-b-4 border-gray-950 flex justify-center"
          onPointerDown={(e) => { e.preventDefault(); handleMobileControl('LEFT'); }}
        >
          <ChevronLeft className="text-white" />
        </button>
        <div className="flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
        <button 
          className="bg-gray-800 active:bg-gray-700 p-4 rounded border-b-4 border-gray-950 flex justify-center"
          onPointerDown={(e) => { e.preventDefault(); handleMobileControl('RIGHT'); }}
        >
          <ChevronRight className="text-white" />
        </button>
        <div />
        <button 
          className="bg-gray-800 active:bg-gray-700 p-4 rounded border-b-4 border-gray-950 flex justify-center"
          onPointerDown={(e) => { e.preventDefault(); handleMobileControl('DOWN'); }}
        >
          <ChevronDown className="text-white" />
        </button>
        <div />
      </div>

      <div className="hidden sm:flex mt-4 text-xs text-gray-500 gap-4">
        <span>[ARROWS] to Move</span>
        <span>•</span>
        <span>Goal: {WINNING_SCORE} PTS</span>
      </div>
    </div>
  );
};

export default SnakeGame;