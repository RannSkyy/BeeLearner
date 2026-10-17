import React from 'react';

interface FoxMascotProps {
  className?: string;
  size?: number;
  speechText?: string;
  cheering?: boolean;
}

export const FoxMascot: React.FC<FoxMascotProps> = ({
  className = '',
  size = 140,
  speechText,
  cheering = false
}) => {
  return (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      role="img"
      aria-label="Rusty the Fox Mascot"
    >
      {/* Speech Bubble */}
      {speechText && (
        <div className="relative bg-white/95 backdrop-blur-sm text-slate-800 text-sm md:text-base font-bold px-5 py-3 rounded-2xl shadow-lg border border-slate-200/80 max-w-[280px] md:max-w-xs animate-bounce-gentle">
          <p className="leading-snug text-slate-900">{speechText}</p>
          {/* Bubble tail pointing left towards the fox */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/95" />
        </div>
      )}

      {/* Vector SVG Fox */}
      <div
        style={{ width: size, height: size * 0.95 }}
        className={`relative shrink-0 transition-transform duration-300 ${
          cheering ? 'scale-110 -rotate-3' : 'animate-float'
        }`}
      >
        <svg
          viewBox="0 0 160 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-lg"
        >
          <defs>
            <linearGradient id="foxOrange" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="0.6" stopColor="#F97316" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="foxBackpack" x1="40" y1="80" x2="120" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Ears */}
          {/* Left Ear */}
          <polygon points="46,65 30,16 68,36" fill="url(#foxOrange)" stroke="#C2410C" strokeWidth="2" />
          <polygon points="44,60 35,26 62,40" fill="#7C2D12" />
          <polygon points="46,55 38,32 58,42" fill="#FED7AA" />

          {/* Right Ear */}
          <polygon points="114,65 130,16 92,36" fill="url(#foxOrange)" stroke="#C2410C" strokeWidth="2" />
          <polygon points="116,60 125,26 98,40" fill="#7C2D12" />
          <polygon points="114,55 122,32 102,42" fill="#FED7AA" />

          {/* Blue Backpack Straps & Shoulders */}
          <rect x="44" y="98" width="14" height="42" rx="7" fill="url(#foxBackpack)" />
          <rect x="102" y="98" width="14" height="42" rx="7" fill="url(#foxBackpack)" />
          {/* Chest badge */}
          <circle cx="80" cy="118" r="9" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <path d="M78 114 L82 118 L78 122" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />

          {/* Fox Body */}
          <path
            d="M50 96 C50 96 62 90 80 90 C98 90 110 96 110 96 C116 112 115 138 115 138 C115 138 98 144 80 144 C62 144 45 138 45 138 C45 138 44 112 50 96 Z"
            fill="url(#foxOrange)"
          />
          {/* White Chest */}
          <path
            d="M66 94 C72 92 88 92 94 94 C96 108 92 126 80 134 C68 126 64 108 66 94 Z"
            fill="#FFFBEB"
          />

          {/* Fox Head Base */}
          <ellipse cx="80" cy="68" rx="44" ry="36" fill="url(#foxOrange)" stroke="#C2410C" strokeWidth="1.5" />

          {/* White Fluffy Cheeks */}
          <path
            d="M38 72 C32 78 30 90 42 92 C56 94 72 82 80 78 C88 82 104 94 118 92 C130 90 128 78 122 72 C116 64 108 66 100 68 C88 71 72 71 60 68 C52 66 44 64 38 72 Z"
            fill="#FFFBEB"
          />

          {/* Rosy Cheeks */}
          <ellipse cx="48" cy="76" rx="6" ry="4" fill="#FB7185" opacity="0.6" />
          <ellipse cx="112" cy="76" rx="6" ry="4" fill="#FB7185" opacity="0.6" />

          {/* Cartoon Eyes */}
          {/* Left Eye */}
          <ellipse cx="60" cy="58" rx="8" ry="10" fill="#1E293B" />
          <circle cx="58" cy="54" r="3.5" fill="#FFFFFF" />
          <circle cx="62" cy="62" r="1.5" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="100" cy="58" rx="8" ry="10" fill="#1E293B" />
          <circle cx="98" cy="54" r="3.5" fill="#FFFFFF" />
          <circle cx="102" cy="62" r="1.5" fill="#FFFFFF" />

          {/* Button Nose */}
          <ellipse cx="80" cy="68" rx="5.5" ry="4" fill="#1E293B" />
          <ellipse cx="79" cy="66" rx="2" ry="1" fill="#FFFFFF" opacity="0.8" />

          {/* Cheerful Smile */}
          <path
            d="M72 74 Q80 84 88 74"
            stroke="#991B1B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="#DC2626"
          />

          {/* Waving Paw (Left side / viewer's left arm raised) */}
          <g className={cheering ? 'animate-bounce' : 'animate-bounce-gentle'}>
            <ellipse
              cx="26"
              cy="62"
              rx="12"
              ry="10"
              transform="rotate(-25 26 62)"
              fill="url(#foxOrange)"
              stroke="#C2410C"
              strokeWidth="1.5"
            />
            {/* Paw pads */}
            <circle cx="25" cy="61" r="4" fill="#FED7AA" />
            <circle cx="20" cy="56" r="1.8" fill="#FED7AA" />
            <circle cx="26" cy="53" r="1.8" fill="#FED7AA" />
            <circle cx="32" cy="57" r="1.8" fill="#FED7AA" />
          </g>

          {/* Other resting paw */}
          <ellipse cx="132" cy="98" rx="10" ry="8" fill="url(#foxOrange)" />
        </svg>
      </div>
    </div>
  );
};
