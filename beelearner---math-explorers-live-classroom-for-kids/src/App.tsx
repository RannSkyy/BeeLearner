import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Play
} from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { TabletClassroom } from './components/classroom/TabletClassroom';
import { VelocityScroll } from './components/common/VelocityScroll';
import { KidsPlayZone } from './components/game/KidsPlayZone';
import { CurriculumSection } from './components/sections/CurriculumSection';
import { AnimalFriendsSection } from './components/sections/AnimalFriendsSection';
import { PricingSection } from './components/sections/PricingSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/common/BackToTop';
import { FreeTrialModal } from './components/modals/FreeTrialModal';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const handleOpenTrial = () => {
    sounds.playStarEarned();
    setIsTrialModalOpen(true);
  };

  const handleCloseTrial = () => {
    setIsTrialModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 antialiased font-sans">
      {/* Top Fixed Header */}
      <Navbar onOpenBooking={handleOpenTrial} />

      <main className="flex-1">
        {/* HERO SECTION WITH TABLET CLASSROOM */}
        <section
          id="classroom"
          className="relative pt-24 sm:pt-28 md:pt-32 pb-16 px-4 bg-gradient-to-b from-[#E6F7FA] via-[#F0FBFD] to-[#FAF8F5] overflow-hidden"
        >
          {/* Decorative ambient elements */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Playful Pill-free Kicker */}
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-5 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>THE 1-ON-1 VIRTUAL MATH CLASSROOM FOR KIDS</span>
              <span className="text-amber-500">·</span>
              <span>AGES 4–12</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto font-heading">
              Where Math Feels Like Play.{' '}
              <span className="text-amber-500 inline-block underline decoration-amber-300 decoration-wavy decoration-2">
                Live Explorations
              </span>{' '}
              for Young Minds.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Step into an interactive tablet world where friendly cartoon companions, visual manipulatives, and warm certified teachers guide your child through joyful problem solving.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleOpenTrial}
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>Start Free 1-on-1 Trial Class</span>
              </button>
              <a
                href="#games"
                onClick={() => sounds.playClick()}
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base rounded-2xl shadow-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-800" />
                <span>Play Free Kid Games</span>
              </a>
            </div>

            {/* Star Trust Rating */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-slate-900 font-black">4.9 / 5.0</span>
              <span>·</span>
              <span>Trusted by 45,000+ parents & schools worldwide</span>
            </div>
          </div>

          {/* THE EXACT TABLET CLASSROOM INTERFACE FROM REFERENCE */}
          <div className="mt-12 md:mt-16 relative z-20">
            <TabletClassroom />
          </div>
        </section>

        {/* OVERLAPPING SECTION: STATS & CONFIDENCE BANNER */}
        <section className="relative z-20 -mt-6 sm:-mt-10 px-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight tabular-nums">
                45,000+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase">
                Active Explorers
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight tabular-nums">
                98.4%
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase">
                Parent Confidence
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight tabular-nums">
                2.4x
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase">
                Faster Math Growth
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-sky-600 tracking-tight tabular-nums">
                100%
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase">
                Free Diagnostic
              </div>
            </div>
          </div>
        </section>

        {/* VELOCITY SCROLL TICKER */}
        <div className="mt-16">
          <VelocityScroll />
        </div>

        {/* KIDS PLAY ZONE & INTERACTIVE MINI GAME */}
        <KidsPlayZone />

        {/* PROGRESSIVE CURRICULUM SECTION */}
        <CurriculumSection onBookTrial={handleOpenTrial} />

        {/* ANIMATED FOREST COMPANIONS SECTION */}
        <AnimalFriendsSection />

        {/* PARENT TESTIMONIALS & SOCIAL PROOF */}
        <section className="py-20 px-4 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
                <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span>PARENT STORIES</span>
                <span className="text-amber-500">·</span>
                <span>Real Transformations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                From Math Tears to Pure Joy
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Read how 1-on-1 gamified mentoring transformed math from a daily struggle into our students' favorite hour of the week.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-3xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                    "My 7-year-old daughter used to cry whenever we opened addition worksheets. After just three weeks with Mr. David and Rusty the Fox, she asks to do math before dinner!"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center font-black text-amber-800 text-sm">
                    JL
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Jessica Lin</div>
                    <div className="text-[11px] text-slate-500">Mom to Maya (Grade 2) · California</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-3xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                    "The tablet interface is sheer genius. Leo loves earning his stars and moving the bee along the progress dots. His mental addition speed doubled in one month."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center font-black text-sky-800 text-sm">
                    MK
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Marcus Klein</div>
                    <div className="text-[11px] text-slate-500">Dad to Leo (Grade 1) · New York</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-3xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                    "Barnaby Bear's fraction bakery solved what school teachers couldn't explain. Being able to pause, chat with the tutor, and replay mini-games is unmatched."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center font-black text-emerald-800 text-sm">
                    ET
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Elena Thorne</div>
                    <div className="text-[11px] text-slate-500">Mom to Chloe (Grade 4) · London</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <PricingSection onBookTrial={handleOpenTrial} />

        {/* CONTACT & CONSULTATION SECTION */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer onBookTrial={handleOpenTrial} />

      {/* FLOATING BACK TO TOP WITH BEE MASCOT */}
      <BackToTop />

      {/* FREE TRIAL MODAL */}
      <FreeTrialModal isOpen={isTrialModalOpen} onClose={handleCloseTrial} />
    </div>
  );
}
