import { getInput } from '../../utils/index.js';

/**
 * get all 4 directions neighbours to a given tree
 * @param grid the tree greed
 * @param i tree position x axis
 * @param j tree position y axis
 * @returns an array of directions, each direction contains all the neighbours height
 */
const getNeighbours = (grid: number[][], i: number, j: number): number[][] => [
  // top
  grid.map(row => row[j]).filter((value, index) => index !== i).slice(0, i),
  // bottom
  grid.map(row => row[j]).filter((value, index) => index !== i).slice(i),
  // left
  grid[i].slice(0, j),
  // right
  grid[i].slice(j + 1),
];

/**
 * get all 4 directions neighbours to a given tree and checks for any higher tree
 * @param grid the tree greed
 * @param i tree position x axis
 * @param j tree position y axis
 * @returns true if there's an higher tree in any given direction
 */
const higherTreeInAnyDirection = (grid: number[][], i: number, j: number): boolean =>
  getNeighbours(grid, i, j)
    .map(direction => direction.filter(tree => tree >= grid[i][j]))
    .some(direction => direction.length === 0);

const getVisibleTreeCount = (grid: number[][]): number => {
  // external trees
  let count = (grid.length * 2) + ((grid[0].length * 2) - 4);

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      // getting neighbours and checking if any of it is higher than current tree
      count = (higherTreeInAnyDirection(grid, i, j)) ? count + 1 : count;
    }
  }
  return count;
}

const getVisibilityScore = (grid: number[][]): number => {
  let maxScore = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      // getting neighbours and checking if any of it is higher than current tree
      const neighbours = getNeighbours(grid, i, j);
      // reversing top & left direction for brevity
      neighbours[0] = neighbours[0].reverse();
      neighbours[2] = neighbours[2].reverse();
      // getting scores
      const score = neighbours.map(direction => {
        for (let z = 0; z < direction.length; z++) {
          if (direction[z] >= grid[i][j]) return z + 1;
        }
        return direction.length;
      }).reduce((a, b) => a * b, 1);
      maxScore = (score > maxScore) ? score : maxScore;
    }
  }
  return maxScore;
}

// crunching input
const input: number[][] = getInput(2022, 8).split('\n').map(line => line.split('').map(Number));

export const firstPart = (): number => getVisibleTreeCount(input);
export const secondPart = (): number => getVisibilityScore(input);
