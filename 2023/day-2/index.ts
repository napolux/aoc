import { getInput } from "../../utils/index.js";

interface GameData {
  red?: number;
  green?: number;
  blue?: number;
}

interface Game {
  gameNum: number;
  gameData: GameData[];
  isValidGame: boolean;
}

const getGamesPower = (input: Game[]): number => {
  return input.map((i) => {
    let rMax = 0;
    let gMax = 0;
    let bMax = 0;
    i.gameData.forEach((d) => {
      rMax = Math.max(rMax, d.red ?? 0);
      gMax = Math.max(gMax, d.green ?? 0);
      bMax = Math.max(bMax, d.blue ?? 0);
    })
    return rMax * gMax * bMax;
  }).reduce((a, b) => a + b, 0);
}

const getPossibleGamesSum = (input: Game[], red: number, green: number, blue: number): number => {
  return input.map((i) => {
    return {
      gameNum: i.gameNum,
      isValidGame: i.gameData.map((d) => {
        const [r, g, b] = [d.red ?? 0, d.green ?? 0, d.blue ?? 0];
        return (r <= red && g <= green && b <= blue);
      }).every(Boolean),
    }
  }).filter((game) => game.isValidGame).map((game) => game.gameNum).reduce((a, b) => a + b, 0);
}

// crunching input: 
// getting an object with game number and games
const crunchInput = (): Game[] => {
  const lines = getInput(2023, 2).split('\n');
  // example game line
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  return lines.map((line) => {
    const [num, data] = line.split(':');
    const gameNum = Number(num.match(/\d+/)[0]);
    const gameData = data.trim().split(';').map(g => g.trim()).map((game) => {
      const sets = game.split(', ');
      const obj = {};
      sets.forEach((set) => {
        const [count, color] = set.split(' ');
        obj[color] = Number(count);
      })
      return obj;
    });
    return {
      gameNum,
      gameData,
      isValidGame: false,
    }
  });
};

const input = crunchInput();

export const firstPart = (): number => getPossibleGamesSum(input, 12, 13, 14);
export const secondPart = (): number => getGamesPower(input);
