import { getInput } from "../../utils/index.js";

interface Race {
  time: number;
  distance: number;
}

interface Race {
  time: number;
  distance: number;
}

const winningRaces = (races: Race[]): number =>
  races.reduce((totalBeats, r) => {
    let beat = 0;
    for (let hold = 1; hold < r.time - 1; hold++) {
      if ((r.time - hold) * hold > r.distance) {
        beat++;
      }
    }
    return totalBeats * beat;
  }, 1);

const crunchInput = (ignoreSpaces: boolean): Race[] => {
  const races: Race[] = [];
  const lines = getInput(2023, 6).split('\n').map((line) => (ignoreSpaces) ? line.replaceAll(' ', '') : line);
  const times = lines[0].match(/\d+/g);
  const distances = lines[1].match(/\d+/g);
  times.forEach((t, i) => {
    races.push({
      time: +t,
      distance: +distances[i],
    });
  });
  return races;
}

export const firstPart = (): number => winningRaces(crunchInput(false));
export const secondPart = (): number => winningRaces(crunchInput(true));
