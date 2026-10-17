import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import { BeeMascot } from '../mascots/BeeMascot';
import { sounds } from '../../utils/soundEffects';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Live Classroom', href: '#classroom' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Animal Friends', href: '#animals' },
    { name: 'Play Zone', href: '#games' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#classroom"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#classroom');
          }}
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <BeeMascot size={26} animate={false} />
          </div>
          <span className="font-heading">BeeLearner</span>
        </a>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sounds.playStarEarned();
              onOpenBooking();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-102 active:scale-98 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Book Free Class</span>
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              sounds.playStarEarned();
              onOpenBooking();
            }}
            className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg shadow-xs"
          >
            Free Class
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 text-base font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <button
                onClick={() => {
                  sounds.playStarEarned();
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Book Free Trial Class</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
