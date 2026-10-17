import React, { useState } from 'react';

interface BeeMascotProps {
  className?: string;
  size?: number;
  animate?: boolean;
  peeking?: boolean;
  onClick?: () => void;
  showSpeech?: string;
}

export const BeeMascot: React.FC<BeeMascotProps> = ({
  className = '',
  size = 64,
  animate = true,
  peeking = false,
  onClick,
  showSpeech
}) => {
  const [isWobbling, setIsWobbling] = useState(false);

  const handleClick = () => {
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 600);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block cursor-pointer select-none transition-transform duration-300 hover:scale-105 ${
        animate ? 'animate-float' : ''
      } ${isWobbling ? 'scale-110 rotate-6' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Buzzy the Bee!"
      role="img"
      aria-label="Cute yellow Bee Mascot"
    >
      {showSpeech && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-md border-2 border-white pointer-events-none z-20">
          {showSpeech}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rotate-45" />
        </div>
      )}

      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="beeYellow" x1="20" y1="20" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE033" />
            <stop offset="0.6" stopColor="#FFC700" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="beeWing" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BAE6FD" stopOpacity="0.9" />
            <stop offset="0.8" stopColor="#7DD3FC" stopOpacity="0.75" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0.6" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Wings (Right & Left behind or on sides) */}
        <g className="animate-flutter" style={{ transformOrigin: '95px 45px' }}>
          <ellipse
            cx="102"
            cy="42"
            rx="24"
            ry="15"
            transform="rotate(25 102 42)"
            fill="url(#beeWing)"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeDasharray="1 0"
          />
          <path d="M92 46 C98 42, 110 38, 120 42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className="animate-flutter" style={{ transformOrigin: '80px 35px', animationDelay: '0.1s' }}>
          <ellipse
            cx="85"
            cy="28"
            rx="18"
            ry="12"
            transform="rotate(-15 85 28)"
            fill="url(#beeWing)"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
        </g>

        {/* Bee Antennae */}
        <path
          d="M52 48 Q 42 22 32 26"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="30" cy="27" r="6" fill="#1E293B" />

        <path
          d="M74 46 Q 78 18 90 22"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="92" cy="23" r="6" fill="#1E293B" />

        {/* Bee Body */}
        <g filter="url(#softGlow)">
          <ellipse cx="68" cy="78" rx="42" ry="38" fill="url(#beeYellow)" stroke="#B45309" strokeWidth="2.5" />

          {/* Stripes */}
          <path
            d="M50 48 Q 68 55 86 52 L 88 64 Q 68 67 48 60 Z"
            fill="#1E293B"
          />
          <path
            d="M40 70 Q 68 80 96 74 L 98 86 Q 68 94 38 82 Z"
            fill="#1E293B"
          />
          <path
            d="M44 94 Q 68 104 92 98 L 88 108 Q 68 114 48 104 Z"
            fill="#1E293B"
          />

          {/* Stinger */}
          <polygon points="26,76 18,80 26,84" fill="#0F172A" />

          {/* Rosy Cheeks */}
          <ellipse cx="48" cy="85" rx="7" ry="4.5" fill="#F43F5E" opacity="0.45" />
          <ellipse cx="88" cy="85" rx="7" ry="4.5" fill="#F43F5E" opacity="0.45" />

          {/* Big Cartoon Eyes */}
          {/* Left Eye */}
          <ellipse cx="56" cy="70" rx="9" ry="12" fill="#0F172A" />
          <circle cx="53" cy="66" r="4.5" fill="#FFFFFF" />
          <circle cx="58" cy="74" r="1.8" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="80" cy="70" rx="9" ry="12" fill="#0F172A" />
          <circle cx="77" cy="66" r="4.5" fill="#FFFFFF" />
          <circle cx="82" cy="74" r="1.8" fill="#FFFFFF" />

          {/* Smiling Mouth */}
          <path
            d="M60 86 Q 68 95 76 86"
            stroke="#831843"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="#DC2626"
          />
        </g>
      </svg>
    </div>
  );
};
