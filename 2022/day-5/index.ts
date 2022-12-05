import { cloneDeep } from "lodash-es";
import { getInput } from "../../utils/index.js";
import { start } from "./resources/input.js";

enum MOVE {
  COUNT,
  FROM,
  TO,
}

const moveCrates = (dock: string[][], procedure: number[][], isUsingCrateMover9001 = false) => {
  procedure.forEach(step => {
    // get containers to be moved from stack
    const toBeMoved = (isUsingCrateMover9001)
      ? dock[step[MOVE.FROM]].splice(-step[MOVE.COUNT])
      : dock[step[MOVE.FROM]].splice(-step[MOVE.COUNT]).reverse();
    // put in place in the new stack
    dock[step[MOVE.TO]] = [...dock[step[MOVE.TO]], ...toBeMoved];
  });
  return dock;
}

// crunching input
const procedure = getInput(2022, 5)
  .split('\n')
  .map(step =>
    step
      .replace('move ', '')
      .replace(' from ', ',')
      .replace(' to ', ',')
      .split(',')
      // this is to get correct array indexes
      .map((detail, index) =>
        (index > 0) ? parseInt(detail) - 1 : parseInt(detail))
  );

export const firstPart = (): string => moveCrates(cloneDeep(start), procedure).map(stack => stack.pop()).join('');
export const secondPart = (): string => moveCrates(cloneDeep(start), procedure, true).map(stack => stack.pop()).join('');
