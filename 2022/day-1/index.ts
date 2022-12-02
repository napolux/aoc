import { input } from './resources/input.js';

const elves = input.split("\n\n");

// crunching input
const getElvesCalories = () => {
  const calories: number[] = [];
  elves.forEach((elf) => {
    // counting calories for single elf
    const elfCalories = elf.split("\n");
    // we want numbers :-)
    const nums = elfCalories.map(s => +s);
    const value = nums.reduce((a, b) => a + b, 0);
    calories.push(value);
  })
  return calories.sort((a, b) => b - a);
}

export const firstPart = (): any => {
  // get "richest" elf calories count
  return getElvesCalories().shift();
}

export const secondPart = (): any => {
  // get top 3 "richest" elves in calories
  return getElvesCalories().slice(0, 3).reduce((a, b) => a + b, 0);
}

