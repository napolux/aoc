import { getInput } from "../../utils/index.js";

const HEADER_INTERVAL = 4;
const MSG_INTERVAL = 14;

const getStart = (data: string, interval = HEADER_INTERVAL): number => {
  for (let i = 0; i < data.length - interval; i++) {
    const map = new Map<string, number>();
    // inserting data in a map
    data.slice(i, i + interval).split('').map(
      char => map.has(char)
        ? map.set(char, map.get(char) + 1)
        : map.set(char, 1));

    if (Array.from(map.values()).filter(value => value === 1).length === interval) {
      return i + interval;
    }
  }
  return 0;
}

// crunching input
const input: string = getInput(2022, 6);

export const firstPart = (): number => getStart(input, HEADER_INTERVAL);
export const secondPart = (): number => getStart(input, MSG_INTERVAL);
