import { getInput } from "../../utils/index.js";

// counting total calories for single elf and sorting output
const getElvesCalories = (elves: number[][]): number[] =>
  elves.map((elf) =>
    elf.reduce((a, b) => a + b, 0)
  ).sort((a, b) => b - a);

// crunching input
const elves = getInput(2022, 1).split('\n\n').map(elf => elf.split('\n').map(v => Number(v)));

// get "richest" elf calories count
export const firstPart = (): number => getElvesCalories(elves).shift();
// get top 3 "richest" elves in calories
export const secondPart = (): number => getElvesCalories(elves).slice(0, 3).reduce((a, b) => a + b, 0);
