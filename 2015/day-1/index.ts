import { getInput } from "../../utils/index.js";

// get floor
const getFloor = (input: string): number => {
  return input.split('').reduce((floor, char) => floor + (char === '(' ? 1 : -1), 0);
}

const getBasementIndex = (input: string): number => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if ((floor += input[i] === '(' ? 1 : -1) === -1) {
      return i + 1;
    }
  }
}

// crunching input
const input = getInput(2015, 1);


// get coordinates
export const firstPart = (): number => getFloor(input);
// get numbers from letters, too
export const secondPart = (): number => getBasementIndex(input);
