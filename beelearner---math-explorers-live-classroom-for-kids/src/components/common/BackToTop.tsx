import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { BeeMascot } from '../mascots/BeeMascot';
import { sounds } from '../../utils/soundEffects';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sounds.playStarEarned();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center group">
      {/* Speech tooltip on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-1 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full shadow-md whitespace-nowrap pointer-events-none">
        Fly to Top! 🐝
      </div>

      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-2xl bg-white border-2 border-amber-300 shadow-xl flex items-center justify-center p-1 hover:scale-110 active:scale-95 transition-all text-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200"
        aria-label="Back to top"
        title="Back to top"
      >
        <div className="relative flex flex-col items-center">
          <ArrowUp className="w-4 h-4 text-slate-900 group-hover:-translate-y-0.5 transition-transform" />
          <div className="w-5 h-5 -mt-1">
            <BeeMascot size={20} animate={false} />
          </div>
        </div>
      </button>
    </div>
  );
};
