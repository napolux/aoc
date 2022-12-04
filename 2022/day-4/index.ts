import { getInput } from "../../utils/index.js";

const START = 0;
const END = 1;

const isCompletelyOverlapping = (assignments: string[]): boolean => {
  const firstElf = assignments[0].split('-').map(section => parseInt(section));
  const secondElf = assignments[1].split('-').map(section => parseInt(section));
  return (
    firstElf[START] <= secondElf[START] && firstElf[END] >= secondElf[END] ||
    secondElf[START] <= firstElf[START] && secondElf[END] >= firstElf[END]
  )
}

// crunching input
const input: string[][] = getInput(2022, 4).split('\n').map(assignments => assignments.split(','));

export const firstPart = (): number =>
  input.filter(assignment => isCompletelyOverlapping(assignment)).length;
export const secondPart = (): number => 0;
