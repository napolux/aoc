import { getInput } from "../../utils/index.js";

const HEADER_INTERVAL = 4;
const MSG_INTERVAL = 14;

const getContentStart = (data: string, interval = HEADER_INTERVAL): number => {
  // moving window on input
  for (let i = 0; i < data.length - interval; i++) {
    // if our slice has duplicates, the Set size will be lower than the interval
    if (new Set(data.slice(i, i + interval).split('')).size === interval) {
      return i + interval;
    }
  }
  return 0;
}

// crunching input
const input: string = getInput(2022, 6);

export const firstPart = (): number => getContentStart(input, HEADER_INTERVAL);
export const secondPart = (): number => getContentStart(input, MSG_INTERVAL);
