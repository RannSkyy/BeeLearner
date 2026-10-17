import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SAMPLE_QUESTIONS,
  validateAnswer,
  calculateHoneyScore,
  formatTimeRemaining
} from './mathLogic.ts';

test('first question equation 8 + 5 = 13 matches reference mockup exactly', () => {
  const q1 = SAMPLE_QUESTIONS[0];
  assert.equal(q1.num1, 8);
  assert.equal(q1.correctAnswer, 5);
  assert.deepEqual(q1.options, [3, 4, 5]);
  assert.equal(q1.topic, 'Addition to 20');
});

test('validateAnswer gives correct score, increments stars, and provides celebratory cheer', () => {
  const q1 = SAMPLE_QUESTIONS[0];
  const result = validateAnswer(q1, 5, 3);
  assert.equal(result.isCorrect, true);
  assert.equal(result.newStarCount, 4);
  assert.equal(result.scoreEarned, 100);
  assert.match(result.feedback, /Brilliant/);
});

test('validateAnswer rejects wrong answer and preserves star count with gentle hint', () => {
  const q1 = SAMPLE_QUESTIONS[0];
  const result = validateAnswer(q1, 3, 3);
  assert.equal(result.isCorrect, false);
  assert.equal(result.newStarCount, 3);
  assert.equal(result.scoreEarned, 0);
  assert.match(result.feedback, /Count up/);
});

test('calculateHoneyScore handles streak multipliers and medal tier evaluation', () => {
  const lowResult = calculateHoneyScore(2, 0, 10);
  assert.equal(lowResult.medal, 'Bronze');

  const midResult = calculateHoneyScore(6, 4, 20);
  assert.equal(midResult.medal, 'Gold');

  const highResult = calculateHoneyScore(12, 9, 30);
  assert.equal(highResult.medal, 'Diamond');
});

test('formatTimeRemaining formats seconds into MM:SS format accurately', () => {
  assert.equal(formatTimeRemaining(934), '15:34');
  assert.equal(formatTimeRemaining(60), '01:00');
  assert.equal(formatTimeRemaining(5), '00:05');
});
