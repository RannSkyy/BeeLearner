import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Heart,
  Star
} from 'lucide-react';
import { BeeMascot } from '../mascots/BeeMascot';
import { FoxMascot } from '../mascots/FoxMascot';
import { calculateHoneyScore } from '../../game/mathLogic';
import { sounds } from '../../utils/soundEffects';

interface FallingItem {
  id: number;
  val: number;
  x: number; // percentage 10% to 85%
  y: number; // percentage 0% to 100%
  speed: number;
  isTarget: boolean;
}

export const KidsPlayZone: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [beeX, setBeeX] = useState(50); // percentage 10% to 90%
  const [targetSum, setTargetSum] = useState(10);
  const [baseNum, setBaseNum] = useState(6);
  const [neededNum, setNeededNum] = useState(4);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(450);

  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const nextItemIdRef = useRef<number>(1);

  // Generate a new equation: baseNum + neededNum = targetSum
  const generateNewGoal = () => {
    const target = 10;
    const base = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const needed = target - base;
    setTargetSum(target);
    setBaseNum(base);
    setNeededNum(needed);
  };

  const startGame = () => {
    sounds.playCelebrate();
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setStreak(0);
    setLives(3);
    setBeeX(50);
    setItems([]);
    generateNewGoal();
  };

  const restartGame = () => {
    startGame();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setBeeX((prev) => Math.max(8, prev - 7));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setBeeX((prev) => Math.min(92, prev + 7));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Touch / mouse track inside game arena
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying || gameOver || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBeeX(Math.min(90, Math.max(10, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPlaying || gameOver || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBeeX(Math.min(90, Math.max(10, x)));
  };

  // Main game tick loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    let spawnTimer = 0;

    const tick = () => {
      spawnTimer++;

      // Spawn falling honey jars every ~45 frames
      if (spawnTimer % 45 === 0) {
        const id = nextItemIdRef.current++;
        // 50% chance to spawn the needed answer, 50% random
        const isTarget = Math.random() < 0.45;
        let val = neededNum;
        if (!isTarget) {
          const fakeChoices = [1, 2, 3, 5, 7, 8, 9].filter((n) => n !== neededNum);
          val = fakeChoices[Math.floor(Math.random() * fakeChoices.length)];
        }

        const newItem: FallingItem = {
          id,
          val,
          x: Math.floor(Math.random() * 75) + 12,
          y: -5,
          speed: 1.1 + Math.random() * 0.7,
          isTarget: val === neededNum
        };

        setItems((prev) => [...prev, newItem]);
      }

      // Update positions & check collisions
      setItems((prevItems) => {
        const nextItems: FallingItem[] = [];

        for (const item of prevItems) {
          const newY = item.y + item.speed;

          // Check collision with bee (bee is at y ~ 85%, x = beeX)
          const isColliding =
            newY >= 80 && newY <= 92 && Math.abs(item.x - beeX) < 14;

          if (isColliding) {
            if (item.isTarget) {
              sounds.playCorrect();
              setScore((s) => {
                const newScore = s + 100 + streak * 20;
                if (newScore > highScore) setHighScore(newScore);
                return newScore;
              });
              setStreak((st) => st + 1);
              generateNewGoal();
            } else {
              sounds.playWrong();
              setStreak(0);
              setLives((l) => {
                const nextLives = l - 1;
                if (nextLives <= 0) {
                  setGameOver(true);
                  setIsPlaying(false);
                  sounds.playCelebrate();
                }
                return nextLives;
              });
            }
            continue; // Remove caught item
          }

          // Item missed bottom
          if (newY > 105) {
            if (item.isTarget) {
              // Missed the right answer
              setStreak(0);
            }
            continue; // Remove fallen item
          }

          nextItems.push({ ...item, y: newY });
        }

        return nextItems;
      });

      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, neededNum, beeX, streak, highScore]);

  const { medal } = calculateHoneyScore(Math.floor(score / 50), streak, 20);

  return (
    <div id="games" className="relative scroll-mt-24 py-16 px-4 max-w-6xl mx-auto">
      {/* Header with Playful Badge */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>KIDS PLAY ZONE</span>
          <span className="text-amber-500">·</span>
          <span>100% Free Game</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Buzzy’s Honey Catcher Quest 🍯
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Help Buzzy collect honey pots that complete the magical equations! Move left and right with your mouse, touch, or arrow keys.
        </p>
      </div>

      {/* Game Card Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100 p-4 sm:p-6 shadow-2xl border-4 border-white/80 overflow-hidden">
        {/* Sky Clouds and Hills Decor */}
        <div className="absolute top-4 left-6 opacity-80 pointer-events-none">
          <svg width="70" height="30" viewBox="0 0 100 40" fill="#FFFFFF">
            <path d="M10,35 Q20,10 40,25 Q60,5 80,25 Q95,20 95,35 Z" />
          </svg>
        </div>
        <div className="absolute top-8 right-10 opacity-70 pointer-events-none">
          <svg width="90" height="35" viewBox="0 0 100 40" fill="#FFFFFF">
            <path d="M15,35 Q25,12 45,26 Q65,8 85,26 Q95,20 95,35 Z" />
          </svg>
        </div>

        {/* Game HUD Bar */}
        <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 mb-4 shadow-sm border border-white flex flex-wrap items-center justify-between gap-3">
          {/* Target Equation Prompt */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg shadow-xs">
              🍯
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Current Mission</div>
              <div className="text-base sm:text-xl font-black text-slate-900">
                {baseNum} + <span className="text-amber-600 font-extrabold underline">[ ? ]</span> = {targetSum}
              </div>
            </div>
          </div>

          {/* Stats: Score & Lives */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-500">HONEY SCORE</div>
              <div className="text-lg sm:text-2xl font-black text-amber-600 tabular-nums">
                {score} pts
              </div>
            </div>

            {/* Lives */}
            <div className="flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-transform ${
                    i < lives
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-300 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Streak Bonus */}
            {streak > 1 && (
              <div className="hidden sm:flex items-center gap-1 bg-amber-500 text-white text-xs font-black px-2.5 py-1.5 rounded-xl shadow-xs animate-bounce">
                <Zap className="w-3.5 h-3.5" />
                <span>{streak}x Combo!</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Play Arena */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-80 sm:h-96 w-full rounded-2xl bg-gradient-to-b from-[#8AD9FF] via-[#C9EEFF] to-[#80D25B] border-2 border-white/60 overflow-hidden cursor-ew-resize select-none shadow-inner"
        >
          {/* Distant Hills in Background */}
          <div className="absolute bottom-0 w-full h-24 bg-[#5AA732] rounded-t-[50%] pointer-events-none" />
          <div className="absolute bottom-0 w-full h-14 bg-[#418F1A] rounded-t-[30%] pointer-events-none" />

          {/* Start Screen Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30">
              <div className="w-20 h-20 bg-amber-400 rounded-3xl p-3 shadow-xl mb-4 border-2 border-white animate-bounce-gentle">
                <BeeMascot size={56} animate={false} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                Ready to Catch Honey?
              </h3>
              <p className="text-white/90 text-sm max-w-sm mt-1 mb-5">
                Catch the honey jar that solves the equation! Avoid the wrong numbers to keep your 3 hearts.
              </p>
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base px-7 py-3.5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>START PLAYING</span>
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-3xl shadow-xl mb-3 border-2 border-white animate-bounce">
                🏆
              </div>
              <h3 className="text-3xl font-black text-white">Fantastic Effort!</h3>
              <p className="text-amber-200 font-bold text-sm mt-1">
                You earned the <span className="underline">{medal} Explorer Medal</span>!
              </p>
              <div className="bg-white/10 rounded-2xl px-6 py-3 my-4 border border-white/20">
                <div className="text-xs text-white/80">Final Score</div>
                <div className="text-3xl font-black text-amber-300 tabular-nums">
                  {score} Points
                </div>
              </div>
              <button
                onClick={restartGame}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>PLAY AGAIN</span>
              </button>
            </div>
          )}

          {/* Falling Honey Jars */}
          {isPlaying &&
            items.map((item) => (
              <div
                key={item.id}
                className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none transition-transform"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`
                }}
              >
                {/* Honey Jar Graphic */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-400 border-2 border-amber-600 rounded-xl shadow-lg flex items-center justify-center font-black text-slate-950 text-base sm:text-lg">
                  {item.val}
                </div>
                <div className="w-6 h-2 bg-amber-600 rounded-t-sm -mt-1" />
              </div>
            ))}

          {/* Player Controlled Bee */}
          {isPlaying && (
            <div
              className="absolute bottom-4 -translate-x-1/2 pointer-events-none transition-all duration-75"
              style={{ left: `${beeX}%` }}
            >
              <BeeMascot size={70} animate={true} />
              {/* Basket / Catcher under the bee */}
              <div className="w-16 h-4 bg-amber-800/80 rounded-b-xl border border-amber-900 mx-auto -mt-2 shadow-sm" />
            </div>
          )}
        </div>

        {/* Mobile touch helper buttons */}
        <div className="flex justify-between items-center mt-3 sm:hidden">
          <button
            onClick={() => setBeeX((prev) => Math.max(8, prev - 12))}
            className="flex-1 mr-2 py-3 bg-white/90 text-slate-800 font-bold rounded-xl shadow-sm text-center active:bg-amber-100"
          >
            ← Move Left
          </button>
          <button
            onClick={() => setBeeX((prev) => Math.min(92, prev + 12))}
            className="flex-1 ml-2 py-3 bg-white/90 text-slate-800 font-bold rounded-xl shadow-sm text-center active:bg-amber-100"
          >
            Move Right →
          </button>
        </div>
      </div>
    </div>
  );
};
