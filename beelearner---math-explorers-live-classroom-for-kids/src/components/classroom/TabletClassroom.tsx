import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  Smile,
  PhoneOff,
  Paperclip,
  Send,
  HelpCircle,
  LayoutGrid,
  GraduationCap,
  Calendar,
  MessageSquare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FoxMascot } from '../mascots/FoxMascot';
import { BeeMascot } from '../mascots/BeeMascot';
import {
  SAMPLE_QUESTIONS,
  validateAnswer,
  formatTimeRemaining,
  MathQuestion
} from '../../game/mathLogic';
import { sounds } from '../../utils/soundEffects';

interface Message {
  id: string;
  sender: 'teacher' | 'you';
  text: string;
  time: string;
}

export const TabletClassroom: React.FC = () => {
  // Lesson state
  const [questionIndex, setQuestionIndex] = useState(0);
  const [stars, setStars] = useState(3);
  const [secondsRemaining, setSecondsRemaining] = useState(934); // 15:34
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>(
    'Which number completes the equation?'
  );
  const [showCelebration, setShowCelebration] = useState(false);

  // Tablet Controls
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'materials'>('chat');
  const [activeNav, setActiveNav] = useState('lessons');
  const [floatingReactions, setFloatingReactions] = useState<
    Array<{ id: number; emoji: string; left: number }>
  >([]);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'teacher',
      text: 'Great job! 🎉',
      time: '10:16 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const currentQ: MathQuestion = SAMPLE_QUESTIONS[questionIndex] || SAMPLE_QUESTIONS[0];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const handleSelectOption = (num: number) => {
    setSelectedAnswer(num);
    sounds.playClick();

    const result = validateAnswer(currentQ, num, stars);
    if (result.isCorrect) {
      setIsAnswerCorrect(true);
      setStars(result.newStarCount);
      setFeedbackText(result.feedback);
      setShowCelebration(true);
      sounds.playCorrect();
      sounds.playStarEarned();

      // Teacher automated congratulatory message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'teacher',
            text: `Superb! You solved it! ⭐ +1 Star for your team!`,
            time: 'Just now'
          }
        ]);
      }, 700);

      // Auto advance to next question after 2 seconds
      setTimeout(() => {
        if (questionIndex < SAMPLE_QUESTIONS.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
          setShowCelebration(false);
          setFeedbackText(SAMPLE_QUESTIONS[questionIndex + 1].prompt);
        }
      }, 2200);
    } else {
      setIsAnswerCorrect(false);
      setFeedbackText(result.feedback);
      sounds.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < SAMPLE_QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setShowCelebration(false);
      setFeedbackText(SAMPLE_QUESTIONS[questionIndex + 1].prompt);
    } else {
      // Loop or restart
      setQuestionIndex(0);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setShowCelebration(false);
      setFeedbackText(SAMPLE_QUESTIONS[0].prompt);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    sounds.playClick();
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'you',
      text: inputMessage.trim(),
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulated warm teacher reply
    setTimeout(() => {
      const teacherReplies = [
        'Excellent focus! Rusty and I are so proud of your hard work! 🦊',
        'That is exactly right! You are mastering this concept! 🌟',
        'Wonderful question! Let us look at the next number together! 🐝'
      ];
      const randomReply = teacherReplies[Math.floor(Math.random() * teacherReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'teacher',
          text: randomReply,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const triggerReaction = (emoji: string) => {
    sounds.playStarEarned();
    const id = Date.now();
    const left = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    setFloatingReactions((prev) => [...prev, { id, emoji, left }]);
    setShowReactionPicker(false);

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  const toggleSound = () => {
    const isNowMuted = sounds.toggleMute();
    setSoundEnabled(!isNowMuted);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* Sound toggle floating helper */}
      <div className="flex justify-between items-center mb-3 px-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-700 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
          <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span>Interactive Live Simulator</span>
          <span className="text-slate-400">·</span>
          <span className="text-amber-600">Try clicking the answers below!</span>
        </div>
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-300 transition-colors shadow-sm"
          title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-500" />
              <span>Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Sound Off</span>
            </>
          )}
        </button>
      </div>

      {/* Stylus Pen Resting on Top of Tablet Frame */}
      <div className="relative flex justify-center -mb-2 z-20">
        <div
          className="w-64 md:w-80 h-2.5 md:h-3 rounded-full bg-gradient-to-r from-slate-200 via-white to-slate-200 shadow-md border border-slate-300/60 flex items-center justify-end px-2"
          title="Digital Stylus Pen"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2" />
          <div className="w-4 h-1 rounded-sm bg-slate-300" />
        </div>
      </div>

      {/* Outer Tablet Frame (Matching Reference Device) */}
      <div className="relative rounded-[2rem] sm:rounded-[2.8rem] p-3 sm:p-5 md:p-6 bg-[#0E131F] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border-4 border-[#1E293B]">
        {/* Left Bezel Camera Notch */}
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#05080E] ring-1 ring-slate-700" />
          <div className="w-1 h-1 rounded-full bg-emerald-500/80" />
        </div>

        {/* Peeking Cute Bee Mascot on Bottom-Right */}
        <div className="absolute -bottom-6 -right-4 sm:-bottom-9 sm:-right-7 md:-bottom-12 md:-right-10 z-40">
          <BeeMascot
            size={100}
            animate={true}
            showSpeech="Buzz! You can do it!"
            onClick={() => sounds.playStarEarned()}
          />
        </div>

        {/* Floating Hearts / Reactions on Screen */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {floatingReactions.map((r) => (
            <div
              key={r.id}
              className="absolute bottom-20 text-3xl animate-bounce"
              style={{
                left: `${r.left}%`,
                transition: 'transform 1.8s ease-out, opacity 1.8s ease-out',
                animation: 'float-slow 2s ease-out forwards'
              }}
            >
              {r.emoji}
            </div>
          ))}
        </div>

        {/* Tablet Screen Content Container */}
        <div className="relative rounded-[1.6rem] sm:rounded-[2.2rem] bg-[#0A1224] overflow-hidden flex flex-col md:flex-row min-h-[580px] lg:h-[660px]">
          {/* Left Navy Nav Rail */}
          <div className="w-full md:w-16 bg-[#0B1528] border-b md:border-b-0 md:border-r border-slate-800/80 flex md:flex-col items-center justify-between p-2 md:py-4 md:px-2 shrink-0 z-10">
            {/* Top Logo / Bee */}
            <div
              onClick={() => sounds.playStarEarned()}
              className="cursor-pointer hover:scale-105 transition-transform"
              title="BeeLearner Explorer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center p-1 shadow-inner">
                <BeeMascot size={32} animate={false} />
              </div>
            </div>

            {/* Middle Nav Icons */}
            <div className="flex md:flex-col items-center gap-3 sm:gap-4 md:gap-5 my-auto">
              <button
                onClick={() => {
                  setActiveNav('dashboard');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl transition-all ${
                  activeNav === 'dashboard'
                    ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Dashboard"
                aria-label="Dashboard"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveNav('lessons');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl transition-all ${
                  activeNav === 'lessons'
                    ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Current Lesson"
                aria-label="Current Lesson"
              >
                <GraduationCap className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveNav('calendar');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl transition-all ${
                  activeNav === 'calendar'
                    ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Schedule"
                aria-label="Schedule"
              >
                <Calendar className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveNav('chat');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl transition-all ${
                  activeNav === 'chat'
                    ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Messages"
                aria-label="Messages"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveNav('user');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl transition-all ${
                  activeNav === 'user'
                    ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Student Profile"
                aria-label="Student Profile"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveNav('settings');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl transition-all ${
                  activeNav === 'settings'
                    ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Settings"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Help Icon */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  sounds.playClick();
                  setFeedbackText('Tip: Break numbers down or count up with Rusty! 🦊');
                }}
                className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                title="Need Help?"
                aria-label="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Main Stage + Header */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-900 relative overflow-hidden">
            {/* Top Bar Header inside tablet */}
            <div className="bg-white/95 backdrop-blur-md px-3 sm:px-5 py-2.5 sm:py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 z-20">
              {/* Left Breadcrumb */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <button
                  onClick={() => sounds.playClick()}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                  aria-label="Back"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-slate-900">Math Explorers</span>
                <span className="text-slate-400">›</span>
                <span className="text-slate-600 truncate max-w-[140px] sm:max-w-none">
                  Lesson 4: Addition to 20
                </span>
              </div>

              {/* Center Question Progress Dots */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                  Question {questionIndex + 1} of 10
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-1">
                  {[...Array(10)].map((_, idx) => {
                    const isCompleted = idx < questionIndex;
                    const isCurrent = idx === questionIndex;
                    return (
                      <div key={idx} className="relative flex items-center justify-center">
                        {isCurrent ? (
                          <div className="relative">
                            <div className="w-3.5 sm:w-4 h-1.5 sm:h-2 bg-emerald-500 rounded-full" />
                            {/* Tiny bee perched on current question */}
                            <div className="absolute -top-3.5 -left-1 w-4 h-4 pointer-events-none">
                              <BeeMascot size={18} animate={false} />
                            </div>
                          </div>
                        ) : isCompleted ? (
                          <div className="w-2.5 sm:w-3 h-1.5 sm:h-2 bg-emerald-500 rounded-full" />
                        ) : (
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-slate-300 rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Stats (Stars & Timer) */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Stars earned badge */}
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2 sm:px-3 py-1 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-sm">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-xs sm:text-sm font-bold text-amber-950 tabular-nums">
                      {stars} stars
                    </div>
                    <div className="text-[9px] text-amber-700/80 hidden sm:block">
                      stars earned
                    </div>
                  </div>
                </div>

                {/* Time remaining badge */}
                <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200/80 px-2 sm:px-3 py-1 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-xs sm:text-sm font-bold text-sky-950 tabular-nums font-mono">
                      {formatTimeRemaining(secondsRemaining)}
                    </div>
                    <div className="text-[9px] text-sky-700/80 hidden sm:block">
                      time remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Game Canvas / Landscape Viewport */}
            <div className="relative flex-1 flex flex-col justify-between overflow-hidden p-4 sm:p-6 select-none bg-gradient-to-b from-[#7FCBF8] via-[#B2E4FF] to-[#DCF5FF]">
              {/* Animated Sun & Clouds in Sky */}
              <div className="absolute top-4 right-12 w-14 h-14 rounded-full bg-amber-300/80 blur-[2px] shadow-[0_0_30px_rgba(252,211,77,0.7)]" />
              {/* Fluffy clouds */}
              <div className="absolute top-6 left-10 opacity-70 animate-float">
                <svg width="80" height="30" viewBox="0 0 100 40" fill="#FFFFFF">
                  <path d="M10,35 Q20,10 40,25 Q60,5 80,25 Q95,20 95,35 Z" />
                </svg>
              </div>
              <div
                className="absolute top-12 right-24 opacity-60 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <svg width="90" height="35" viewBox="0 0 100 40" fill="#FFFFFF">
                  <path d="M15,35 Q25,12 45,26 Q65,8 85,26 Q95,20 95,35 Z" />
                </svg>
              </div>

              {/* Rolling Hills Scenic Layers (Matching Reference Background) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Distant Blue-Green Mountain */}
                <svg
                  className="absolute bottom-0 right-0 w-full h-48 opacity-40"
                  viewBox="0 0 800 200"
                  preserveAspectRatio="none"
                  fill="#5486B8"
                >
                  <path d="M400,200 Q580,50 800,90 L800,200 Z" />
                </svg>

                {/* Midground Bright Green Hill */}
                <svg
                  className="absolute bottom-0 left-0 w-full h-44"
                  viewBox="0 0 800 200"
                  preserveAspectRatio="none"
                  fill="#78C63E"
                >
                  <path d="M0,80 Q250,160 500,70 Q680,10 800,80 L800,200 L0,200 Z" />
                </svg>

                {/* Foreground Lush Green Meadow with Flower Sprinkles */}
                <svg
                  className="absolute bottom-0 left-0 w-full h-32"
                  viewBox="0 0 800 160"
                  preserveAspectRatio="none"
                  fill="#5CAE28"
                >
                  <path d="M0,60 Q180,12 420,70 Q640,110 800,30 L800,160 L0,160 Z" />
                </svg>

                {/* Daisy Flowers */}
                <div className="absolute bottom-6 left-12 flex gap-1">
                  <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </div>
                  <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-xs mt-1">
                    <div className="w-1 h-1 bg-amber-400 rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-8 right-32 flex gap-1.5">
                  <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Fox Mascot & Question Speech Bubble */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 mt-1 sm:mt-3">
                <FoxMascot
                  size={110}
                  cheering={showCelebration}
                  speechText={feedbackText}
                />
              </div>

              {/* Central Math Equation Card (Exact 8 + [?] = 13 layout from reference) */}
              <div className="relative z-10 my-auto flex flex-col items-center">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-[0_15px_30px_rgba(0,0,0,0.12)] border border-white/80 max-w-md w-full transition-all duration-300">
                  <div className="flex items-center justify-center gap-3 sm:gap-5 text-3xl sm:text-5xl font-black text-slate-800 tracking-tight">
                    <span>{currentQ.num1}</span>
                    <span className="text-amber-500 font-extrabold">{currentQ.operator}</span>

                    {/* Missing Number Box (Dashed Blue Border from reference!) */}
                    <div
                      className={`min-w-[58px] sm:min-w-[76px] h-14 sm:h-20 rounded-2xl flex items-center justify-center transition-all ${
                        isAnswerCorrect
                          ? 'bg-emerald-50 border-3 border-emerald-500 text-emerald-600 scale-105'
                          : selectedAnswer !== null && !isAnswerCorrect
                          ? 'bg-rose-50 border-3 border-rose-400 text-rose-600 animate-shake'
                          : 'bg-sky-50/60 border-2 sm:border-3 border-dashed border-sky-400 text-sky-400'
                      }`}
                    >
                      {isAnswerCorrect ? (
                        <span className="animate-bounce font-black">{currentQ.correctAnswer}</span>
                      ) : (
                        <span className="font-extrabold text-sky-400 text-3xl sm:text-4xl">?</span>
                      )}
                    </div>

                    <span>=</span>
                    <span>
                      {currentQ.operator === '+'
                        ? currentQ.num1 + currentQ.correctAnswer
                        : currentQ.operator === '-'
                        ? currentQ.num1 - currentQ.correctAnswer
                        : currentQ.num1 * currentQ.correctAnswer}
                    </span>
                  </div>

                  {/* Feedback Banner if Correct or Incorrect */}
                  {isAnswerCorrect !== null && (
                    <div
                      className={`mt-4 px-3 py-2 rounded-xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 ${
                        isAnswerCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isAnswerCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Hurray! That is correct! +1 Star Earned</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>Not quite, keep trying! Rusty believes in you!</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options (Buttons 3, 4, 5) */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-5">
                  {currentQ.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isRight = isAnswerCorrect && isSelected;
                    const isWrong = isSelected && isAnswerCorrect === false;

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        disabled={isAnswerCorrect === true}
                        className={`w-16 sm:w-22 h-14 sm:h-18 rounded-2xl sm:rounded-3xl font-extrabold text-2xl sm:text-3xl transition-all duration-200 transform shadow-md hover:-translate-y-1 active:scale-95 ${
                          isRight
                            ? 'bg-emerald-500 text-white shadow-emerald-500/40 ring-4 ring-emerald-300 scale-105'
                            : isWrong
                            ? 'bg-rose-400 text-white shadow-rose-400/40'
                            : 'bg-white text-slate-800 hover:bg-amber-50 hover:border-amber-300 border-2 border-slate-100'
                        }`}
                        aria-label={`Option ${option}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Classroom Controls (Unmute, Camera, Raise Hand, Reactions, Leave) */}
              <div className="relative z-20 flex justify-center mt-2 sm:mt-4">
                <div className="bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full shadow-lg border border-white/60 flex items-center gap-3 sm:gap-6">
                  {/* Unmute / Mute */}
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      sounds.playClick();
                    }}
                    className="flex flex-col items-center gap-1 group"
                    aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                        isMuted
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-emerald-500 text-white shadow-sm'
                      }`}
                    >
                      {isMuted ? (
                        <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      ) : (
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
                      {isMuted ? 'Unmute' : 'Mute'}
                    </span>
                  </button>

                  {/* Camera */}
                  <button
                    onClick={() => {
                      setIsCameraOn(!isCameraOn);
                      sounds.playClick();
                    }}
                    className="flex flex-col items-center gap-1 group"
                    aria-label={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                        isCameraOn
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCameraOn ? (
                        <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
                      Camera
                    </span>
                  </button>

                  {/* Raise Hand */}
                  <button
                    onClick={() => {
                      setIsHandRaised(!isHandRaised);
                      sounds.playClick();
                      if (!isHandRaised) {
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: Date.now().toString(),
                            sender: 'you',
                            text: '✋ (Raised hand to ask a question)',
                            time: 'Just now'
                          }
                        ]);
                      }
                    }}
                    className="flex flex-col items-center gap-1 group"
                    aria-label="Raise hand"
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                        isHandRaised
                          ? 'bg-purple-500 text-white shadow-sm ring-2 ring-purple-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
                      Raise hand
                    </span>
                  </button>

                  {/* Reactions Picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowReactionPicker(!showReactionPicker)}
                      className="flex flex-col items-center gap-1 group"
                      aria-label="Send Reaction"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-all">
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
                        Reactions
                      </span>
                    </button>

                    {showReactionPicker && (
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-1.5 z-30">
                        {['⭐', '🎉', '❤️', '🦊', '🐝', '👏'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => triggerReaction(emoji)}
                            className="p-1.5 text-xl hover:scale-125 transition-transform"
                            aria-label={`React with ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Leave */}
                  <button
                    onClick={() => {
                      sounds.playClick();
                      if (confirm('Do you want to reset this interactive demo lesson?')) {
                        setQuestionIndex(0);
                        setStars(3);
                        setSelectedAnswer(null);
                        setIsAnswerCorrect(null);
                      }
                    }}
                    className="flex flex-col items-center gap-1 group"
                    aria-label="Leave Lesson"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-500 text-white hover:bg-rose-600 flex items-center justify-center transition-all shadow-sm">
                      <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-rose-600">
                      Leave
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Teacher Video, Student Video & Live Chat */}
          <div className="w-full md:w-80 lg:w-96 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200/90 flex flex-col shrink-0">
            {/* Top Video: Teacher Video Stream */}
            <div className="p-3 pb-1.5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-sm border border-slate-300/80 group">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Certified Math Teacher Mr. David"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Live Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Teacher</span>
                </div>
                {/* Audio indicator */}
                <div className="absolute bottom-2.5 left-2.5 w-6 h-6 rounded-full bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-white">
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Second Video: Student (You) Video Stream */}
            <div className="px-3 pb-2">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-sm border border-slate-300/80">
                {isCameraOn ? (
                  <img
                    src="https://images.unsplash.com/photo-1543269664-7eef42226a21?auto=format&fit=crop&w=600&q=80"
                    alt="Student Emma"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-300 gap-1">
                    <User className="w-8 h-8 text-slate-400" />
                    <span className="text-xs font-medium">Camera is off</span>
                  </div>
                )}
                {/* "You" Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>You</span>
                </div>
                {/* Hand Raised badge on video */}
                {isHandRaised && (
                  <div className="absolute top-2.5 right-2.5 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-bounce">
                    <Hand className="w-3 h-3" />
                    <span>Hand Raised</span>
                  </div>
                )}
                {/* Mic status indicator */}
                <div className="absolute bottom-2.5 left-2.5 w-6 h-6 rounded-full bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-white">
                  {isMuted ? (
                    <MicOff className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Chat vs Materials Tab Switcher */}
            <div className="flex border-b border-slate-200 px-3 bg-white">
              <button
                onClick={() => {
                  setActiveTab('chat');
                  sounds.playClick();
                }}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'chat'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => {
                  setActiveTab('materials');
                  sounds.playClick();
                }}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'materials'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Materials
              </button>
            </div>

            {/* Active Tab Content Area */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col justify-between p-3 min-h-[160px] bg-white">
                {/* Chat Stream */}
                <div
                  ref={chatScrollRef}
                  className="space-y-3 overflow-y-auto max-h-[140px] md:max-h-[170px] pr-1"
                >
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-2 items-start ${
                        m.sender === 'you' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {m.sender === 'teacher' && (
                        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-300">
                          <img
                            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80"
                            alt="Teacher"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="max-w-[82%]">
                        {m.sender === 'teacher' && (
                          <div className="text-[11px] font-bold text-slate-600 mb-0.5">
                            Teacher
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2 text-xs sm:text-sm ${
                            m.sender === 'teacher'
                              ? 'bg-slate-100 text-slate-800 rounded-tl-xs'
                              : 'bg-amber-500 text-white rounded-tr-xs'
                          }`}
                        >
                          {m.text}
                        </div>
                        <div
                          className={`text-[9px] text-slate-400 mt-0.5 ${
                            m.sender === 'you' ? 'text-right' : ''
                          }`}
                        >
                          {m.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Child Replies */}
                <div className="flex gap-1.5 overflow-x-auto py-1.5 scrollbar-none">
                  {['I solved it! 🎉', 'Help please 🦊', 'Ready for next! ⭐'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        setInputMessage(chip);
                      }}
                      className="text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200/80 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => sounds.playClick()}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Attach homework worksheet"
                    aria-label="Attach file"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm px-3 py-2 rounded-xl border border-transparent focus:border-amber-400 focus:outline-none transition-colors"
                  />

                  <button
                    type="button"
                    onClick={() => sounds.playClick()}
                    className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg transition-colors"
                    title="Voice input"
                    aria-label="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-colors shadow-xs"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Materials Tab */
              <div className="flex-1 p-3 bg-white space-y-3 overflow-y-auto">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Lesson 4 Assets
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        Addition_to_20_Worksheet.pdf
                      </div>
                      <div className="text-[10px] text-slate-500">2.4 MB · 8 Problems</div>
                    </div>
                  </div>
                  <button
                    onClick={() => sounds.playClick()}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                  >
                    View
                  </button>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                      10s
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        Interactive Ten-Frame Blocks
                      </div>
                      <div className="text-[10px] text-slate-500">Visual Math Tool</div>
                    </div>
                  </div>
                  <button
                    onClick={() => sounds.playCorrect()}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                  >
                    Open
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
