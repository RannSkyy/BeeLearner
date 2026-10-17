import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '7',
    gradeLevel: 'Grade 1-2',
    email: '',
    phone: '',
    learningGoal: 'Confidence & Mental Math',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.parentName.trim()) errs.parentName = 'Parent name is required';
    if (!formData.childName.trim()) errs.childName = 'Child name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      sounds.playWrong();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      sounds.playCelebrate();
    }, 900);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 px-4 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
              <Mail className="w-4 h-4 text-amber-600" />
              <span>PARENT CONCIERGE</span>
              <span className="text-amber-500">·</span>
              <span>24/7 Support</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Book Your Child’s Free 1-on-1 Class
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Have questions about matching the best mentor for your child’s learning style or grade level? Fill out this quick form or reach our education advisors directly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Toll-Free Parent Hotline</div>
                  <div className="text-sm font-black text-slate-900">+1 (800) 555-BEE-MATH</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Email Advisors</div>
                  <div className="text-sm font-black text-slate-900">support@beelearner.edu</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Response Time</div>
                  <div className="text-sm font-black text-slate-900">Under 15 minutes during school hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Trial Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 relative">
            {isSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Free Class Requested! 🎉
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-900">{formData.parentName}</span>! Our lead academic advisor is pairing{' '}
                  <span className="font-bold text-amber-600">{formData.childName}</span> with our top certified mentor for {formData.gradeLevel}.
                </p>
                <div className="bg-amber-50 rounded-2xl p-4 max-w-sm mx-auto border border-amber-200 text-left text-xs space-y-1">
                  <div><strong>Confirmation sent to:</strong> {formData.email}</div>
                  <div><strong>SMS Reminder:</strong> {formData.phone}</div>
                  <div><strong>Class Duration:</strong> 30 Minutes (1-on-1 Interactive)</div>
                </div>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      parentName: '',
                      childName: '',
                      childAge: '7',
                      gradeLevel: 'Grade 1-2',
                      email: '',
                      phone: '',
                      learningGoal: 'Confidence & Mental Math',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Book Another Class
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-xl font-black text-slate-900">
                    Schedule Your Free Assessment Class
                  </h3>
                  <p className="text-xs text-slate-500">
                    No credit card required. Includes full 1-on-1 diagnostic lesson & custom learning plan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Parent's Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.parentName
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200'
                      }`}
                    />
                    {errors.parentName && (
                      <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.parentName}</p>
                    )}
                  </div>

                  {/* Child's Name */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Child's Name *
                    </label>
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="e.g. Leo"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.childName
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200'
                      }`}
                    />
                    {errors.childName && (
                      <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.childName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Grade Level Dropdown */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Child's Current Grade Level *
                    </label>
                    <select
                      value={formData.gradeLevel}
                      onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                    >
                      <option value="Pre-K & Kindergarten">Pre-K & Kindergarten (Ages 4-5)</option>
                      <option value="Grade 1-2">Grade 1 & 2 (Ages 6-8)</option>
                      <option value="Grade 3-4">Grade 3 & 4 (Ages 8-10)</option>
                      <option value="Grade 5-6">Grade 5 & 6 (Ages 10-12)</option>
                    </select>
                  </div>

                  {/* Learning Goal */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Primary Learning Goal
                    </label>
                    <select
                      value={formData.learningGoal}
                      onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                    >
                      <option value="Confidence & Mental Math">Confidence & Mental Math</option>
                      <option value="School Grade Catch-Up">School Grade Catch-Up</option>
                      <option value="Advanced / Gifted Math">Advanced / Gifted Math</option>
                      <option value="Olympiad & Competition Prep">Olympiad & Competition Prep</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parent Email */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Phone Number (for SMS confirmation) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.phone
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Special notes / topics your child is working on (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Leo loves word problems but gets nervous with timed addition..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-300 text-slate-950 font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Confirming Trial Slot...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950" />
                      <span>Confirm 1-on-1 Free Class</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
