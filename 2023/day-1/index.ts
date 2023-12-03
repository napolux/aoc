import { getInput } from "../../utils/index.js";

const NUMBERS_MAP: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

// getting [0-9] from each line of the input
// sum of the first and last digit
const getCoordinates = (coords: string[]): number => {
  return coords
    .map(c => c.replace(/\D/g, ''))
    .reduce((a, b) => {
      return a + (b ? +`${b[0]}${b[b.length - 1]}` : 0);
    }, 0);
}

// crunching input
const firstInput = getInput(2023, 1).split('\n');

const secondInput = firstInput.map(input => {
  const first = input.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/gm)[0] ?? 0;
  const last = input.match(/.*([0-9]|one|two|three|four|five|six|seven|eight|nine).*$/)[1] ?? 0;
  return `${isNaN(+first) ? NUMBERS_MAP[first] : first}${isNaN(+last) ? NUMBERS_MAP[last] : last}`;
});

export const firstPart = (): number => getCoordinates(firstInput);
export const secondPart = (): number => getCoordinates(secondInput);
