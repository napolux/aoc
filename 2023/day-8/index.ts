import { getInput } from "../../utils/index.js";

interface Data {
  L: string;
  R: string;
}

const countSteps = (dir: string, map: Map<string, Data>): number => {
  let steps = 0;
  let found = false;
  let current = 'AAA';
  while (!found) {
    const next: string = map.get(current)[dir[steps % dir.length]];
    if (next === 'ZZZ') {
      found = true;
    } else {
      current = next;
      steps++;
    }
  }
  return steps + 1;
}

const getStartingKeys = (map: Map<string, Data>): string[] =>
  Object.keys(map).filter(k => k[2] === 'A');

const countSimultaneousSteps = (dir: string, map: Map<string, Data>): number => {
  let steps = 0;
  let found = false;
  let currentKeys = getStartingKeys(map);
  console.log(currentKeys); process.exit();
  while (!found) {
    const next = map.get(current)[dir[steps % dir.length]];
    if (next === 'ZZZ') {
      found = true;
    } else {
      current = next;
      steps++;
    }
  }
  return steps + 1;
}

const crunchInput = (): { dir: string, map: Map<string, Data> } => {
  const map = new Map<string, Data>();
  const input = getInput(2023, 8).split('\n');
  input.forEach((v, index) => {
    if (index >= 2) {
      const matches = v.match(/[A-Z]{3}/g)
      map.set(matches[0], { L: matches[1], R: matches[2] })
    }
  });

  return {
    dir: input[0],
    map,
  }
}

const { dir, map } = crunchInput();

export const firstPart = (): number => countSteps(dir, map);
export const secondPart = (): number => countSimultaneousSteps(dir, map);
