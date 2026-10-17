import React, { useState } from 'react';
import { Sparkles, Heart, Star, Volume2 } from 'lucide-react';
import { ANIMAL_MENTORS, MascotAvatars, AnimalProfile } from '../mascots/AnimalFriends';
import { FoxMascot } from '../mascots/FoxMascot';
import { BeeMascot } from '../mascots/BeeMascot';
import { sounds } from '../../utils/soundEffects';

export const AnimalFriendsSection: React.FC = () => {
  const [activeAnimalId, setActiveAnimalId] = useState<string>('bee');
  const [animalMessage, setAnimalMessage] = useState<string>(
    'Buzzy says: "Count the flower petals with me to find the secret sum!"'
  );

  const handleAnimalClick = (animal: AnimalProfile) => {
    setActiveAnimalId(animal.id);
    sounds.playStarEarned();

    if (animal.id === 'bee') {
      setAnimalMessage('Buzzy: "Buzz buzz! Every correct answer turns into golden honey stars!"');
    } else if (animal.id === 'fox') {
      setAnimalMessage('Rusty: "Hey adventurer! Let us tackle tricky equations together with my backpack tools!"');
    } else if (animal.id === 'owl') {
      setAnimalMessage('Professor Hootie: "Hoo-hoo! Did you know multiplication is just super fast addition?"');
    } else if (animal.id === 'bear') {
      setAnimalMessage('Barnaby: "Warm bear hugs! Fractions are easy when we slice delicious honeyberry pies!"');
    }
  };

  return (
    <section id="animals" className="relative scroll-mt-24 py-20 px-4 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Heart className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span>ANIMATED COMPANIONS</span>
            <span className="text-orange-500">·</span>
            <span>Math Friends</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Meet the Forest Math Mentors
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Kids never learn alone. Each child is paired with friendly animated mentors who cheer, guide, and turn math into an unforgettable adventure.
          </p>
        </div>

        {/* Live Active Mascot Spotlight Banner */}
        <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="shrink-0">
              {activeAnimalId === 'bee' ? (
                <BeeMascot size={72} animate={true} />
              ) : activeAnimalId === 'fox' ? (
                <FoxMascot size={90} cheering={true} />
              ) : activeAnimalId === 'owl' ? (
                <MascotAvatars animal="owl" size={72} />
              ) : (
                <MascotAvatars animal="bear" size={72} />
              )}
            </div>
            <div>
              <div className="inline-block text-[11px] font-black uppercase text-amber-600 tracking-wider">
                Active Forest Mentor
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 italic">
                {animalMessage}
              </div>
            </div>
          </div>

          <button
            onClick={() => sounds.playCorrect()}
            className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-2xs whitespace-nowrap"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Hear Cheer</span>
          </button>
        </div>

        {/* 4 Animal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ANIMAL_MENTORS.map((animal) => {
            const isSelected = activeAnimalId === animal.id;
            return (
              <div
                key={animal.id}
                onClick={() => handleAnimalClick(animal)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected
                    ? 'bg-white shadow-xl ring-3 ring-amber-400 border-transparent'
                    : 'bg-white/80 hover:bg-white shadow-sm border border-slate-200/80'
                }`}
              >
                {/* Animal Avatar Showcase */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center p-2">
                    {animal.id === 'bee' ? (
                      <BeeMascot size={52} animate={false} />
                    ) : animal.id === 'fox' ? (
                      <FoxMascot size={56} />
                    ) : animal.id === 'owl' ? (
                      <MascotAvatars animal="owl" size={52} />
                    ) : (
                      <MascotAvatars animal="bear" size={52} />
                    )}
                  </div>
                  <span className="text-[11px] font-extrabold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    {animal.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900">{animal.name}</h3>
                <div className="text-xs font-bold text-amber-600 mt-0.5 mb-2">
                  {animal.role}
                </div>
                <div className="text-xs font-semibold text-slate-500 mb-3">
                  Specialty: <span className="text-slate-800">{animal.specialty}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {animal.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-amber-600">
                  <span>{isSelected ? 'Selected Friend ⭐' : 'Click to Meet'}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
