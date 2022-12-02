import { input } from './resources/input.js';

const elves = input.split("\n\n");

// crunching input
const getElvesCalories = (): number[] =>
  // counting total calories for single elf and sorting output
  elves.map((elf) =>
    elf.split("\n").map(s => +s).reduce((a, b) => a + b, 0)
  ).sort((a, b) => b - a);

export const firstPart = (): number => {
  // get "richest" elf calories count
  return getElvesCalories().shift();
}

export const secondPart = (): number => {
  // get top 3 "richest" elves in calories
  return getElvesCalories().slice(0, 3).reduce((a, b) => a + b, 0);
}
