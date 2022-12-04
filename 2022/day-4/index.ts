import { getInput } from "../../utils/index.js";

const START = 0;
const END = 1;

const checkOverlap = (first: number[], second: number[], partialOverlap = false): boolean =>
  (partialOverlap)
    ? first[START] >= second[START] && first[START] <= second[END]
    : first[START] <= second[START] && first[END] >= second[END];

const partialOverlap = (assignments: number[][]): boolean =>
  checkOverlap(assignments[0], assignments[1], true) || checkOverlap(assignments[1], assignments[0], true);

const completeOverlap = (assignments: number[][]): boolean =>
  checkOverlap(assignments[0], assignments[1]) || checkOverlap(assignments[1], assignments[0]);

// crunching input
const input: string[][] = getInput(2022, 4).split('\n').map(assignments => assignments.split(','));

const getElvesAssignments = (assignment: string[]) =>
  assignment.map(a => a.split('-').map(Number));

export const firstPart = (): number =>
  input.filter(assignment => completeOverlap(
    getElvesAssignments(assignment)
  )).length;

export const secondPart = (): number =>
  input.filter(assignment => partialOverlap(
    getElvesAssignments(assignment)
  )).length;
