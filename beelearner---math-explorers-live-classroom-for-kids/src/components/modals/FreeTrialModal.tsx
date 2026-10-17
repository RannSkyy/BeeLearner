import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { BeeMascot } from '../mascots/BeeMascot';
import { sounds } from '../../utils/soundEffects';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [childName, setChildName] = useState('');
  const [grade, setGrade] = useState('Grade 1-2');
  const [parentEmail, setParentEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow, 4:00 PM');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) {
      setError('Please provide your child’s name');
      sounds.playWrong();
      return;
    }
    if (!parentEmail.trim() || !parentEmail.includes('@')) {
      setError('Please provide a valid parent email address');
      sounds.playWrong();
      return;
    }

    setError('');
    sounds.playCelebrate();
    setStep(2);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center">
                <BeeMascot size={32} animate={false} />
              </div>
              <div>
                <h3 id="modal-title" className="text-xl font-black text-slate-900">
                  Claim Free 1-on-1 Trial Class
                </h3>
                <p className="text-xs text-slate-500">
                  Full 30-minute interactive tablet classroom lesson with a certified mentor
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Child's Name
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Maya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Child's Grade Track
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:outline-none bg-white"
                >
                  <option value="Kindergarten">Kindergarten (Ages 4-6)</option>
                  <option value="Grade 1-2">Grade 1 & 2 (Ages 6-8)</option>
                  <option value="Grade 3-4">Grade 3 & 4 (Ages 8-10)</option>
                  <option value="Grade 5-6">Grade 5 & 6 (Ages 10-12)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Parent Email (for classroom link)
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:outline-none bg-white"
                >
                  <option value="Today, 5:00 PM">Today, 5:00 PM</option>
                  <option value="Tomorrow, 4:00 PM">Tomorrow, 4:00 PM</option>
                  <option value="Saturday Morning, 10:00 AM">Saturday Morning, 10:00 AM</option>
                  <option value="Sunday Afternoon, 2:00 PM">Sunday Afternoon, 2:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Confirm Assessment & Free Class</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Slot Confirmed! 🌟</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              We have reserved a 1-on-1 virtual tablet seat for <span className="font-bold text-slate-900">{childName}</span> for {preferredDate}.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600">
              Class invitation link sent to: <strong>{parentEmail}</strong>
            </div>
            <button
              onClick={() => {
                onClose();
                setStep(1);
              }}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
