/**
 * Pure math questions, equations and scoring logic for BeeLearner.
 * Decoupled from UI for direct unit testing with node:test.
 */

export interface MathQuestion {
  id: number;
  grade: string;
  topic: string;
  prompt: string;
  num1: number;
  num2: number;
  operator: '+' | '-' | '×';
  missingPosition: 'left' | 'middle' | 'result';
  correctAnswer: number;
  options: number[];
  hint: string;
  foxCheer: string;
}

export const SAMPLE_QUESTIONS: MathQuestion[] = [
  {
    id: 1,
    grade: 'Grade 1-2',
    topic: 'Addition to 20',
    prompt: 'Which number completes the equation?',
    num1: 8,
    num2: 5,
    operator: '+',
    missingPosition: 'middle',
    correctAnswer: 5,
    options: [3, 4, 5],
    hint: 'Count up from 8: 9, 10, 11, 12, 13! That is 5 steps! 🦊',
    foxCheer: 'Brilliant thinking! 8 + 5 = 13! 🎉'
  },
  {
    id: 2,
    grade: 'Grade 1-2',
    topic: 'Addition to 20',
    prompt: 'Can you help Rusty find the missing friend?',
    num1: 7,
    num2: 6,
    operator: '+',
    missingPosition: 'middle',
    correctAnswer: 6,
    options: [5, 6, 8],
    hint: 'Think of doubles: 7 + 7 is 14, so 7 + 6 is one less! 🦊',
    foxCheer: 'Superstar! 7 + 6 equals 13! ⭐'
  },
  {
    id: 3,
    grade: 'Grade 1-2',
    topic: 'Subtraction from 20',
    prompt: 'How many honey jars did Buzzy take away?',
    num1: 15,
    num2: 7,
    operator: '-',
    missingPosition: 'middle',
    correctAnswer: 7,
    options: [6, 7, 9],
    hint: '15 minus what leaves 8? Try taking 5 first, then 2! 🍯',
    foxCheer: 'Awesome job! 15 - 7 = 8! 🐝'
  },
  {
    id: 4,
    grade: 'Grade 1-2',
    topic: 'Addition to 20',
    prompt: 'Solve the equation to earn your gold medal!',
    num1: 9,
    num2: 8,
    operator: '+',
    missingPosition: 'middle',
    correctAnswer: 8,
    options: [7, 8, 10],
    hint: 'Make a 10 first: 9 + 1 = 10, then add 7 more! 🦊',
    foxCheer: 'Magnificent! 9 + 8 is 17! 🚀'
  },
  {
    id: 5,
    grade: 'Grade 1-2',
    topic: 'Multiplication Safari',
    prompt: 'How many total paws do 4 foxes have?',
    num1: 4,
    num2: 4,
    operator: '×',
    missingPosition: 'result',
    correctAnswer: 16,
    options: [12, 14, 16],
    hint: 'Skip count by 4: 4, 8, 12, 16! 🐾',
    foxCheer: 'Woohoo! 4 groups of 4 make 16! 🌟'
  }
];

export interface ValidationResult {
  isCorrect: boolean;
  scoreEarned: number;
  newStarCount: number;
  feedback: string;
}

/**
 * Validates a user's answer against a math question.
 */
export function validateAnswer(
  question: MathQuestion,
  chosenAnswer: number,
  currentStars: number
): ValidationResult {
  const isCorrect = chosenAnswer === question.correctAnswer;
  if (isCorrect) {
    return {
      isCorrect: true,
      scoreEarned: 100,
      newStarCount: currentStars + 1,
      feedback: question.foxCheer
    };
  } else {
    return {
      isCorrect: false,
      scoreEarned: 0,
      newStarCount: currentStars,
      feedback: question.hint
    };
  }
}

/**
 * Calculates honey catcher score and combo multiplier.
 */
export function calculateHoneyScore(
  baseItemsCaught: number,
  streak: number,
  timeBonusSeconds: number
): { totalScore: number; medal: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' } {
  const multiplier = 1 + Math.floor(streak / 3) * 0.5;
  const rawScore = Math.round(baseItemsCaught * 50 * multiplier + timeBonusSeconds * 10);
  
  let medal: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' = 'Bronze';
  if (rawScore >= 800) medal = 'Diamond';
  else if (rawScore >= 500) medal = 'Gold';
  else if (rawScore >= 250) medal = 'Silver';

  return { totalScore: rawScore, medal };
}

/**
 * Formats time in seconds to mm:ss.
 */
export function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
