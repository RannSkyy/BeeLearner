import React from 'react';

export interface AnimalProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarBg: string;
  badge: string;
  description: string;
}

export const ANIMAL_MENTORS: AnimalProfile[] = [
  {
    id: 'bee',
    name: 'Buzzy the Bee',
    role: 'Discovery Guide',
    specialty: 'Counting & Pattern Recognition',
    avatarBg: 'bg-amber-100 border-amber-300 text-amber-900',
    badge: 'Ages 4-6',
    description: 'Flutters across numbers, discovers hidden patterns in flowers, and rewards sweet honey stars!'
  },
  {
    id: 'fox',
    name: 'Rusty the Fox',
    role: 'Equation Explorer',
    specialty: 'Addition, Subtraction & Missing Numbers',
    avatarBg: 'bg-orange-100 border-orange-300 text-orange-900',
    badge: 'Ages 6-8',
    description: 'Energetic adventurer who turns tricky word problems into joyful forest scavenger hunts.'
  },
  {
    id: 'owl',
    name: 'Professor Hootie',
    role: 'Logic & Multiplication Sage',
    specialty: 'Skip Counting & Multiplication Safari',
    avatarBg: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    badge: 'Ages 8-10',
    description: 'Wise master of lightning-quick mental math tricks and geometric puzzle breakdowns.'
  },
  {
    id: 'bear',
    name: 'Barnaby Bear',
    role: 'Fractions & Measurement Chef',
    specialty: 'Parts of Whole, Time & Money',
    avatarBg: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    badge: 'Ages 9-12',
    description: 'Bakes delicious fraction pies and teaches children practical everyday math with gentle patience.'
  }
];

export const MascotAvatars: React.FC<{ animal: 'owl' | 'bear' | 'bunny' | 'turtle'; size?: number }> = ({
  animal,
  size = 56
}) => {
  if (animal === 'owl') {
    return (
      <div style={{ width: size, height: size }} className="relative shrink-0 select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow">
          <ellipse cx="50" cy="55" rx="36" ry="38" fill="#6366F1" />
          <ellipse cx="50" cy="62" rx="26" ry="24" fill="#E0E7FF" />
          {/* Eyeglasses */}
          <circle cx="38" cy="45" r="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />
          <circle cx="62" cy="45" r="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />
          <line x1="52" y1="45" x2="48" y2="45" stroke="#FBBF24" strokeWidth="3" />
          <circle cx="38" cy="45" r="5" fill="#1E1B4B" />
          <circle cx="62" cy="45" r="5" fill="#1E1B4B" />
          <circle cx="36" cy="42" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="42" r="1.5" fill="#FFFFFF" />
          {/* Beak */}
          <polygon points="50,52 46,60 54,60" fill="#F59E0B" />
          {/* Scholar cap */}
          <polygon points="50,15 25,25 50,32 75,25" fill="#1E293B" />
          <rect x="44" y="27" width="12" height="6" fill="#0F172A" />
          <line x1="72" y1="26" x2="76" y2="38" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="76" cy="39" r="2" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  if (animal === 'bear') {
    return (
      <div style={{ width: size, height: size }} className="relative shrink-0 select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow">
          {/* Ears */}
          <circle cx="28" cy="28" r="14" fill="#78350F" />
          <circle cx="28" cy="28" r="8" fill="#FDE68A" />
          <circle cx="72" cy="28" r="14" fill="#78350F" />
          <circle cx="72" cy="28" r="8" fill="#FDE68A" />
          {/* Head */}
          <ellipse cx="50" cy="56" rx="36" ry="34" fill="#92400E" />
          {/* Snout */}
          <ellipse cx="50" cy="66" rx="20" ry="16" fill="#FDE68A" />
          <ellipse cx="50" cy="60" rx="6" ry="4" fill="#1E293B" />
          <path d="M50 64 L50 72 M44 70 Q50 76 56 70" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Eyes */}
          <ellipse cx="38" cy="48" rx="4" ry="6" fill="#1E293B" />
          <circle cx="36" cy="46" r="1.5" fill="#FFFFFF" />
          <ellipse cx="62" cy="48" rx="4" ry="6" fill="#1E293B" />
          <circle cx="60" cy="46" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (animal === 'bunny') {
    return (
      <div style={{ width: size, height: size }} className="relative shrink-0 select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow">
          {/* Ears */}
          <ellipse cx="35" cy="26" rx="9" ry="24" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2" />
          <ellipse cx="35" cy="26" rx="5" ry="16" fill="#F472B6" />
          <ellipse cx="65" cy="26" rx="9" ry="24" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2" />
          <ellipse cx="65" cy="26" rx="5" ry="16" fill="#F472B6" />
          {/* Head */}
          <circle cx="50" cy="62" r="32" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2" />
          <circle cx="40" cy="56" r="4" fill="#1E293B" />
          <circle cx="38" cy="54" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="56" r="4" fill="#1E293B" />
          <circle cx="58" cy="54" r="1.5" fill="#FFFFFF" />
          <polygon points="50,62 47,66 53,66" fill="#EC4899" />
          <path d="M46 68 Q50 72 54 68" stroke="#EC4899" strokeWidth="2" fill="none" />
          {/* Cheeks */}
          <ellipse cx="34" cy="64" rx="5" ry="3" fill="#FB7185" opacity="0.6" />
          <ellipse cx="66" cy="64" rx="5" ry="3" fill="#FB7185" opacity="0.6" />
        </svg>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size }} className="relative shrink-0 select-none">
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow">
        <ellipse cx="50" cy="55" rx="34" ry="28" fill="#10B981" />
        <ellipse cx="50" cy="55" rx="26" ry="20" fill="#047857" stroke="#A7F3D0" strokeWidth="2" strokeDasharray="6 3" />
        <circle cx="80" cy="55" r="10" fill="#34D399" />
        <circle cx="83" cy="53" r="2.5" fill="#064E3B" />
      </svg>
    </div>
  );
};
