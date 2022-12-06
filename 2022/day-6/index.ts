import { getInput } from "../../utils/index.js";

const HEADER_INTERVAL = 4;
const MSG_INTERVAL = 14;

const getContentStart = (data: string, interval = HEADER_INTERVAL): number => {
  for (let i = 0; i < data.length - interval; i++) {
    const set = new Set<string>();
    // inserting data in a set in order to spot duplicates easily
    data.slice(i, i + interval).split('').forEach(char => set.add(char));
    if (set.size === interval)
      return i + interval;
  }
  return 0;
}

// crunching input
const input: string = getInput(2022, 6);

export const firstPart = (): number => getContentStart(input, HEADER_INTERVAL);
export const secondPart = (): number => getContentStart(input, MSG_INTERVAL);
