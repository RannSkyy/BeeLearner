import React from 'react';
import { Sparkles, Trophy, Star, ShieldCheck, HeartHandshake, Smile } from 'lucide-react';

interface TickerItem {
  icon: string;
  title: string;
  tag: string;
  color: string;
}

const ITEMS: TickerItem[] = [
  { icon: '🦊', title: 'Rusty’s Equation Quests', tag: 'Grades 1-2', color: 'bg-orange-50 text-orange-950 border-orange-200' },
  { icon: '🐝', title: 'Buzzy’s Honey Star Rewards', tag: 'Ages 4-7', color: 'bg-amber-50 text-amber-950 border-amber-200' },
  { icon: '🦉', title: 'Mental Math Shortcuts', tag: 'Grades 3-5', color: 'bg-indigo-50 text-indigo-950 border-indigo-200' },
  { icon: '🐻', title: 'Fraction Pizza Parties', tag: 'Grades 2-4', color: 'bg-emerald-50 text-emerald-950 border-emerald-200' },
  { icon: '📐', title: 'Visual Manipulatives & 10-Frames', tag: 'STEM Certified', color: 'bg-sky-50 text-sky-950 border-sky-200' },
  { icon: '⭐', title: 'Live 1-on-1 Certified Mentors', tag: 'Top 1% Tutors', color: 'bg-purple-50 text-purple-950 border-purple-200' },
  { icon: '🎯', title: 'Gamified Mastery Progression', tag: 'Zero Frustration', color: 'bg-rose-50 text-rose-950 border-rose-200' },
  { icon: '🐰', title: 'Early Number Sense Adventures', tag: 'Pre-K & K', color: 'bg-pink-50 text-pink-950 border-pink-200' }
];

export const VelocityScroll: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-8 bg-slate-900 border-y border-slate-800 select-none">
      {/* Soft gradient masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Leftward Marquee */}
      <div className="flex animate-marquee gap-4 py-2">
        {[...ITEMS, ...ITEMS].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border ${item.color} shadow-sm shrink-0 hover:scale-105 transition-transform`}
          >
            <span className="text-2xl" role="img" aria-label={item.title}>
              {item.icon}
            </span>
            <div>
              <div className="text-sm font-extrabold tracking-tight">{item.title}</div>
              <div className="text-[10px] font-bold opacity-75">{item.tag}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Rightward Marquee */}
      <div className="flex animate-marquee-reverse gap-4 pt-3">
        {[...ITEMS.slice().reverse(), ...ITEMS.slice().reverse()].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border ${item.color} shadow-sm shrink-0 hover:scale-105 transition-transform`}
          >
            <span className="text-2xl" role="img" aria-label={item.title}>
              {item.icon}
            </span>
            <div>
              <div className="text-sm font-extrabold tracking-tight">{item.title}</div>
              <div className="text-[10px] font-bold opacity-75">{item.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
