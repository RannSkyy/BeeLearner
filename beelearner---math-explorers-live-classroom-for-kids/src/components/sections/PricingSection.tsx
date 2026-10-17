import React, { useState } from 'react';
import { Check, Sparkles, Shield, Star } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  perClassRate: string;
  classesCount: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Explorer Starter',
    monthlyPrice: 89,
    perClassRate: '$22 / class',
    classesCount: '4 Live Classes / mo',
    description: 'Great for weekly reinforcement and building joyful math confidence.',
    features: [
      '1-on-1 Certified Math Teacher (30 min)',
      'Full access to Fox & Bee interactive classroom',
      'Personalized homework assistance',
      'Downloadable materials & manipulatives',
      'Parent weekly progress dashboard'
    ]
  },
  {
    id: 'adventure',
    name: 'Adventure Pass',
    badge: 'MOST POPULAR',
    popular: true,
    monthlyPrice: 159,
    perClassRate: '$19 / class',
    classesCount: '8 Live Classes / mo',
    description: 'Our flagship 2x/week schedule for accelerated mastery and top test scores.',
    features: [
      'Everything in Starter',
      '2 live 1-on-1 classes per week',
      'Priority choice of certified mentor',
      'Customized pace: advance or catch up',
      'Free access to Kids Play Zone tournaments',
      'Quarterly Math Olympiad preparation'
    ]
  },
  {
    id: 'unlimited',
    name: 'Math Master Club',
    monthlyPrice: 229,
    perClassRate: '$18 / class',
    classesCount: '12 Live Classes / mo',
    description: 'Intensive 3x/week learning with gifted curriculum and competition coaching.',
    features: [
      'Everything in Adventure Pass',
      '3 live 1-on-1 classes per week',
      'Singapore Math & Advanced Logic tracks',
      'Dedicated academic advisor for parents',
      'Unlimited 24/7 homework chat support',
      'Official BeeLearner Certificate of Mastery'
    ]
  }
];

export const PricingSection: React.FC<{ onBookTrial: () => void }> = ({ onBookTrial }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <section id="pricing" className="relative scroll-mt-24 py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>TRANSPARENT TUITION</span>
            <span className="text-emerald-500">·</span>
            <span>Pause or Cancel Anytime</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Flexible Plans for Every Explorer
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Start with a 100% free trial class. No credit card required. Keep the same beloved teacher when you continue.
          </p>

          {/* Billing Cycle Selector */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mt-6 border border-slate-200">
            <button
              onClick={() => {
                setBillingCycle('monthly');
                sounds.playClick();
              }}
              className={`px-5 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => {
                setBillingCycle('quarterly');
                sounds.playClick();
              }}
              className={`flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                billingCycle === 'quarterly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Quarterly</span>
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const finalPrice =
              billingCycle === 'quarterly'
                ? Math.round(tier.monthlyPrice * 0.85)
                : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-amber-400 md:-translate-y-2'
                    : 'bg-slate-50 text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3
                    className={`text-2xl font-black ${
                      tier.popular ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <div
                    className={`text-xs mt-1 mb-4 ${
                      tier.popular ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {tier.classesCount} · {tier.perClassRate}
                  </div>

                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums">
                      ${finalPrice}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        tier.popular ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      / month
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      tier.popular ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {tier.description}
                  </p>

                  <div
                    className={`pt-4 border-t space-y-3 mb-8 ${
                      tier.popular ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            tier.popular ? 'text-amber-400' : 'text-emerald-500'
                          }`}
                        />
                        <span className={tier.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    sounds.playStarEarned();
                    onBookTrial();
                  }}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-102'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start with Free Trial</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Parent Guarantee Banner */}
        <div className="mt-12 bg-amber-50 rounded-2xl p-5 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shrink-0">
              🛡️
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">
                100% Parent Satisfaction Guarantee
              </div>
              <div className="text-xs text-slate-600">
                If your child doesn't smile and learn in their first class, we'll reassign mentors or refund completely.
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-3 py-1.5 rounded-full shrink-0">
            COPPA & KidSAFE Certified
          </span>
        </div>
      </div>
    </section>
  );
};
