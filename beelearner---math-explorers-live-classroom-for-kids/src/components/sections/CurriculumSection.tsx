import React, { useState } from 'react';
import { CheckCircle2, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface GradeTrack {
  id: string;
  grade: string;
  age: string;
  icon: string;
  title: string;
  description: string;
  skills: string[];
  sampleQuestion: string;
  sampleAnswer: string;
}

const TRACKS: GradeTrack[] = [
  {
    id: 'k',
    grade: 'Kindergarten & Pre-K',
    age: 'Ages 4-6',
    icon: '🐰',
    title: 'Little Explorers: Number Sense & Shapes',
    description: 'Children fall in love with numbers through playful counting rhymes, colorful shapes, and animal pattern scavenger hunts.',
    skills: [
      'Counting objects up to 20 with Buzzy',
      '2D & 3D shape identification and sorting',
      'Comparing quantities (more, less, equal)',
      'Visual ten-frame basics'
    ],
    sampleQuestion: 'Buzzy found 3 yellow daisies and 2 pink tulips. How many flowers in total?',
    sampleAnswer: '3 + 2 = 5 Flowers! 🌸'
  },
  {
    id: 'g1',
    grade: 'Grade 1 & 2',
    age: 'Ages 6-8',
    icon: '🦊',
    title: 'Junior Adventurers: Addition & Missing Numbers',
    description: 'The exact stage from our tablet classroom! Kids master mental addition, subtraction facts, double numbers, and equations.',
    skills: [
      'Missing number equations (8 + ? = 13)',
      'Addition and subtraction within 20 and 100',
      'Place value (Tens & Ones)',
      'Telling time on analog and digital clocks'
    ],
    sampleQuestion: 'Rusty has 8 acorns in his backpack. He needs 13 acorns for winter. How many more does he need?',
    sampleAnswer: '8 + [ 5 ] = 13 acorns! 🌰'
  },
  {
    id: 'g3',
    grade: 'Grade 3 & 4',
    age: 'Ages 8-10',
    icon: '🦉',
    title: 'Master Navigators: Multiplication & Fractions',
    description: 'Skip counting turns into confident multiplication tables, area geometry, and delicious visual fraction models.',
    skills: [
      'Multiplication tables (up to 12×12)',
      'Division and equal sharing groups',
      'Fractions on number lines (halves, quarters, eighths)',
      'Two-step word problems & logic mysteries'
    ],
    sampleQuestion: 'Professor Hootie has 4 nests. Each nest holds 4 eggs. How many eggs altogether?',
    sampleAnswer: '4 × 4 = 16 Eggs! 🥚'
  },
  {
    id: 'g5',
    grade: 'Grade 5 & 6',
    age: 'Ages 10-12',
    icon: '🐻',
    title: 'Ace Olympians: Pre-Algebra & Problem Solving',
    description: 'Prepares older students for middle school math with fractions arithmetic, decimals, percentages, and algebraic thinking.',
    skills: [
      'Adding and multiplying fractions with unlike denominators',
      'Decimals, percentages, and money math',
      'Volume, perimeter, and coordinate grids',
      'Algebraic variables and critical thinking'
    ],
    sampleQuestion: 'Barnaby baked a pie and ate 1/4 of it. He gave 1/2 to his cub. How much pie is left?',
    sampleAnswer: '1 - (1/4 + 2/4) = 1/4 left! 🥧'
  }
];

export const CurriculumSection: React.FC<{ onBookTrial: () => void }> = ({ onBookTrial }) => {
  const [selectedTrack, setSelectedTrack] = useState<GradeTrack>(TRACKS[1]); // Default to Grade 1-2 matching reference

  return (
    <section id="curriculum" className="relative scroll-mt-24 py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>PROGRESSIVE CURRICULUM</span>
            <span className="text-sky-500">·</span>
            <span>Ages 4 to 12</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Curriculum Tailored to Every Child’s Pace
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Aligned with international Common Core & Singapore Math standards, transformed into delightful animal stories and gamified milestones.
          </p>
        </div>

        {/* Grade Track Selector Tabs (Buttons with click handlers) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {TRACKS.map((t) => {
            const isActive = selectedTrack.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTrack(t);
                  sounds.playClick();
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all shadow-xs ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <span>{t.grade}</span>
                <span className="text-[10px] opacity-75 font-bold">({t.age})</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Curriculum Card (Overlapping layout) */}
        <div className="relative rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details & Skills */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedTrack.icon}</span>
                <div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                    {selectedTrack.age}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {selectedTrack.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed">
                {selectedTrack.description}
              </p>

              {/* Skills Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Core Skills Learned:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTrack.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sample Tablet Problem Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#77D4E6] to-[#40B4D2] p-6 rounded-3xl shadow-md border-2 border-white text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  Sample Lesson Problem
                </div>
                <span className="text-xs font-bold text-white/90">Common Core Math</span>
              </div>

              <div className="bg-white/95 text-slate-900 p-5 rounded-2xl shadow-inner mb-4">
                <p className="font-bold text-sm sm:text-base leading-snug">
                  "{selectedTrack.sampleQuestion}"
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
                  <span>Solved with Fox:</span>
                  <span className="bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {selectedTrack.sampleAnswer}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playStarEarned();
                  onBookTrial();
                }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Try a Lesson in this Grade</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
