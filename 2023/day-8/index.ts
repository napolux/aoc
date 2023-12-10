import { getInput } from "../../utils/index.js";

interface Data {
  L: string;
  R: string;
}

/** @see https://www.geeksforgeeks.org/lcm-of-given-array-elements/ */
const gcd = (a: number, b: number): number => b == 0 ? a : gcd(b, a % b)
const lcm = (a: number, b: number) => a / gcd(a, b) * b
const lcmAll = (numbers: number[]) => numbers.reduce(lcm, 1)

const getStartingKeys = (map: Map<string, Data>): string[] =>
  Array.from(map.keys()).filter((k) => k.endsWith('A'));

const countSteps = (startingKeys: string[], dir: string, map: Map<string, Data>): number => {
  const steps = [];

  startingKeys.forEach((key) => {
    let count = 0;
    let found = false;
    let current = key;
    while (!found) {
      const next: string = map.get(current)[dir[count % dir.length]];
      if (next.endsWith('Z')) {
        found = true;
      } else {
        current = next;
        count++;
      }
    }
    steps.push(count + 1);
  });

  return lcmAll(steps);
}

const crunchInput = (): { dir: string, map: Map<string, Data> } => {
  const map = new Map<string, Data>();
  const input = getInput(2023, 8).split('\n');
  input.forEach((v, index) => {
    if (index >= 2) {
      const matches = v.match(/[0-9-A-Z]{3}/g);
      map.set(matches[0], { L: matches[1], R: matches[2] });
    }
  });

  return {
    dir: input[0],
    map,
  }
}

const { dir, map } = crunchInput();

export const firstPart = (): number => countSteps(['AAA'], dir, map);
export const secondPart = (): number => countSteps(getStartingKeys(map), dir, map);
