import React from 'react';
import { Sparkles, Shield, Heart, Award, ArrowUpRight } from 'lucide-react';
import { BeeMascot } from '../mascots/BeeMascot';
import { sounds } from '../../utils/soundEffects';

export const Footer: React.FC<{ onBookTrial: () => void }> = ({ onBookTrial }) => {
  const scrollTo = (id: string) => {
    sounds.playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 select-none">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top CTA Band */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 rounded-3xl p-8 sm:p-10 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mb-16">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-slate-950 text-white text-[11px] font-black px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>LIMITED EXPLORER SPOTS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Give Your Child the Gift of Loving Math
            </h3>
            <p className="text-slate-900/90 text-sm sm:text-base font-semibold max-w-lg">
              Watch their eyes light up when equations become an adventure. Book your complimentary 1-on-1 session today.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playStarEarned();
              onBookTrial();
            }}
            className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-black text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            Claim Free Trial Class Now →
          </button>
        </div>

        {/* 4 Column Footer Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-sm">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center">
                <BeeMascot size={22} animate={false} />
              </div>
              <span className="text-xl font-black font-heading tracking-tight">BeeLearner</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering children aged 4-12 to master foundational mathematics with joyful gamified adventures, certified warm teachers, and animated forest companions.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Safe Kids Education Certified</span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <div className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
              Curriculum Tracks
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => scrollTo('#curriculum')} className="hover:text-amber-400 transition-colors">
                  Early Explorers (Pre-K - K)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#curriculum')} className="hover:text-amber-400 transition-colors">
                  Junior Adventurers (Grades 1-2)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#curriculum')} className="hover:text-amber-400 transition-colors">
                  Master Navigators (Grades 3-4)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#curriculum')} className="hover:text-amber-400 transition-colors">
                  Ace Olympians (Grades 5-6)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#classroom')} className="hover:text-amber-400 transition-colors">
                  Addition to 20 Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Play & Mentors */}
          <div>
            <div className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
              Mascots & Play
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => scrollTo('#games')} className="hover:text-amber-400 transition-colors">
                  Buzzy’s Honey Catcher Quest
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#animals')} className="hover:text-amber-400 transition-colors">
                  Rusty the Fox Math Lab
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#animals')} className="hover:text-amber-400 transition-colors">
                  Professor Hootie Logic Puzzles
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#animals')} className="hover:text-amber-400 transition-colors">
                  Barnaby’s Fraction Bakery
                </button>
              </li>
            </ul>
          </div>

          {/* Parents & Trust */}
          <div>
            <div className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
              Parents & Support
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => scrollTo('#pricing')} className="hover:text-amber-400 transition-colors">
                  Membership & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#contact')} className="hover:text-amber-400 transition-colors">
                  Schedule Free Diagnostic
                </button>
              </li>
              <li>
                <span className="text-slate-400">Toll Free: +1 (800) 555-BEE-MATH</span>
              </li>
              <li>
                <span className="text-slate-400">Email: support@beelearner.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Zero Pill Text */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} BeeLearner Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">COPPA Compliance</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
