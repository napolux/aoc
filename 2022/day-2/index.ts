import { find } from 'lodash-es';
import { input } from './resources/input.js';

// crunching input
const games = input.split("\n").map(game => game.split(' '));

type Play = {
  left: string,
  right: string,
  score: number,
}

type Rules = {
  firstPart: Play[]
  secondPart: Play[]
}

const rockPaperScissorsRules: Rules = {
  firstPart: [
    { left: 'A', right: 'X', score: 4 }, // rock/rock draw 1+3
    { left: 'A', right: 'Y', score: 8 }, // rock/paper win 2+6
    { left: 'A', right: 'Z', score: 3 }, // rock/scissors lost 3+0
    { left: 'B', right: 'X', score: 1 }, // paper/rock lost 1+0
    { left: 'B', right: 'Y', score: 5 }, // paper/paper draw 2+3
    { left: 'B', right: 'Z', score: 9 }, // paper/scissors win 3+6
    { left: 'C', right: 'X', score: 7 }, // scissors/rock win 1+6
    { left: 'C', right: 'Y', score: 2 }, // scissors/paper lost 2+0
    { left: 'C', right: 'Z', score: 6 }, // scissors/scissors draw 3+3
  ],
  secondPart: [
    // X YOU MUST LOSE
    // Y YOU MUST DRAW
    // Z YOU MUST WIN
    { left: 'A', right: 'X', score: 3 }, // rock/lose 
    { left: 'A', right: 'Y', score: 4 }, // rock/draw 
    { left: 'A', right: 'Z', score: 8 }, // rock/win 
    { left: 'B', right: 'X', score: 1 }, // paper/lose 
    { left: 'B', right: 'Y', score: 5 }, // paper/draw
    { left: 'B', right: 'Z', score: 9 }, // paper/win
    { left: 'C', right: 'X', score: 2 }, // scissors/lose 
    { left: 'C', right: 'Y', score: 6 }, // scissors/draw 
    { left: 'C', right: 'Z', score: 7 }, // scissors/win 
  ],
}

const results = (left: string, right: string, plays: Play[]): number =>
  find(plays, el => el.left === left && el.right === right).score || 0;

const play = (games: string[][], rules: Play[]): number => games.map(
  game => results(game[0], game[1], rules)
).reduce((a, b) => a + b, 0);

export const firstPart = (): number => play(games, rockPaperScissorsRules.firstPart);
export const secondPart = (): number => play(games, rockPaperScissorsRules.secondPart);
