import { input } from './resources/input.js';

const firstPartScores = new Map<string, number>([
  ['A X', 4], // rock/rock draw 1+3 
  ['A Y', 8], // rock/paper win 2+6
  ['A Z', 3], // rock/scissors lose 3+0
  ['B X', 1], // paper/rock lose 1+0
  ['B Y', 5], // paper/paper draw 2+3
  ['B Z', 9], // paper/scissors win 3+6
  ['C X', 7], // scissors/rock win 1+6
  ['C Y', 2], // scissors/paper lose 2+0
  ['C Z', 6], // scissors/scissors draw 3+3
]);

// X YOU MUST LOSE
// Y YOU MUST DRAW
// Z YOU MUST WIN
const secondPartScores = new Map<string, number>([
  ['A X', 3], // opponent plays rock / you "must" lose 
  ['A Y', 4], // opponent plays rock / you "must" draw 
  ['A Z', 8], // opponent plays rock / you "must" win 
  ['B X', 1], // opponent plays paper / you "must" lose 
  ['B Y', 5], // opponent plays paper / you "must" draw
  ['B Z', 9], // opponent plays paper / you "must" win
  ['C X', 2], // opponent plays scissors / you "must" lose 
  ['C Y', 6], // opponent plays scissors / you "must" draw 
  ['C Z', 7], // opponent plays scissors / you "must" win 
]);

const play = (games: string[], scores: Map<string, number>): number => games.map(
  game => scores.get(game) || 0
).reduce((a, b) => a + b, 0);

// crunching input
const games = input.split('\n');

export const firstPart = (): number => play(games, firstPartScores);
export const secondPart = (): number => play(games, secondPartScores);
