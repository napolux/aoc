import { getInput } from '../../utils/index.js';

enum AXES {
  X,
  Y,
}

interface Directions {
  U: number[];
  D: number[];
  L: number[];
  R: number[];
}

const HEAD = 0;
const FIRST_PART_LENGTH = 2;
const SECOND_PART_LENGTH = 10;

const DIRS: Directions = {
  U: [0, -1], // move 1 place up in the grid
  D: [0, 1],  // move 1 place down in the grid
  L: [-1, 0], // move 1 place left in the grid
  R: [1, 0],  // move 1 place right in the grid
};

type Input = (string | number)[][];

const moveRope = (input: Input, length = FIRST_PART_LENGTH) => {
  // create starting state
  const rope = Array.from({ length }, () => [0, 0]);
  // this is to avoid duplicated positions
  const visited = new Set<string>();

  input.forEach(cmd => {
    // moving for as many places in the command
    for (let i = 0; i < cmd[1]; i++) {
      // move head: point coords are increased/decreased according to directions
      rope[HEAD][AXES.X] += DIRS[cmd[0]][AXES.X];
      rope[HEAD][AXES.Y] += DIRS[cmd[0]][AXES.Y];
      // move other rope points
      for (let j = 1; j < length; j++) {
        // if distance from previous point is > 1 in any direction move the point
        if (rope[j - 1].some((axis, index) => Math.abs(axis - rope[j][index]) > 1)) {
          // Math.sign() to move just by -1, 0, 1
          rope[j][AXES.X] += Math.sign(rope[j - 1][AXES.X] - rope[j][AXES.X]);
          rope[j][AXES.Y] += Math.sign(rope[j - 1][AXES.Y] - rope[j][AXES.Y]);
        }
      }
      // saving tail position
      visited.add(rope[length - 1].join());
    }
  })
  return visited.size;
}

// crunching input
const input: Input = getInput(2022, 9)
  .split('\n')
  .map(line => line.split(' ')
    .map((v, index) => (index === 1) ? parseInt(v) : v)
  );

export const firstPart = (): number => moveRope(input);
export const secondPart = (): number => moveRope(input, SECOND_PART_LENGTH);
