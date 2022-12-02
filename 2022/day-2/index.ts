import { input } from './resources/input.js';

const firstPartScores = new Map<string, number>([
  ['A X', 4], // rock/rock draw 1+3 
  ['A Y', 8], // rock/paper win 2+6
  ['A Z', 3], // rock/scissors lost 3+0
  ['B X', 1], // paper/rock lost 1+0
  ['B Y', 5], // paper/paper draw 2+3
  ['B Z', 9], // paper/scissors win 3+6
  ['C X', 7], // scissors/rock win 1+6
  ['C Y', 2], // scissors/paper lost 2+0
  ['C Z', 6], // scissors/scissors draw 3+3
]);

// X YOU MUST LOSE
// Y YOU MUST DRAW
// Z YOU MUST WIN
const secondPartScores = new Map<string, number>([
  ['A X', 3], // rock/lose 
  ['A Y', 4], // rock/draw 
  ['A Z', 8], // rock/win 
  ['B X', 1], // paper/lose 
  ['B Y', 5], // paper/draw
  ['B Z', 9], // paper/win
  ['C X', 2], // scissors/lose 
  ['C Y', 6], // scissors/draw 
  ['C Z', 7], // scissors/win 
]);

const play = (games: string[], scores: Map<string, number>): number => games.map(
  game => scores.get(game) || 0
).reduce((a, b) => a + b, 0);

// crunching input
const games = input.split("\n");

export const firstPart = (): number => play(games, firstPartScores);
export const secondPart = (): number => play(games, secondPartScores);
