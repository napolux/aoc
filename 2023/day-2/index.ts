import { getInput } from "../../utils/index.js";

interface GameData {
  red?: number;
  green?: number;
  blue?: number;
}

interface Game {
  gameNum: number;
  gameData: GameData[];
  isValidGame?: boolean;
}

const getGamesPower = (input: Game[]): number =>
  input
    .map((game) =>
      game.gameData.reduce(
        (max, data) => ({
          red: Math.max(max.red, data.red ?? 0),
          green: Math.max(max.green, data.green ?? 0),
          blue: Math.max(max.blue, data.blue ?? 0),
        }),
        { red: 0, green: 0, blue: 0 }
      )
    )
    .reduce((total, max) => total + max.red * max.green * max.blue, 0);


const getPossibleGamesSum = (input: Game[], red: number, green: number, blue: number): number =>
  input
    .filter((game) =>
      game.gameData.every(
        (data) => (data.red ?? 0) <= red && (data.green ?? 0) <= green && (data.blue ?? 0) <= blue
      )
    )
    .map((game) => game.gameNum)
    .reduce((total, num) => total + num, 0);


// crunching input: 
// getting an object with game number and games
const crunchInput = (): Game[] => {
  const lines = getInput(2023, 2).split('\n');
  // example game line
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  return lines.map((line) => {
    // first split: game number and game data
    const [num, data] = line.split(':');
    const gameNum = +num.match(/\d+/)[0];
    // splitting game data and sets
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
    }
  });
};

const input = crunchInput();

export const firstPart = (): number => getPossibleGamesSum(input, 12, 13, 14);
export const secondPart = (): number => getGamesPower(input);
