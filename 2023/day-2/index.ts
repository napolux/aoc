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
const crunchInput = (): Game[] =>
  getInput(2023, 2)
    .split('\n')
    .map((line) => {
      const [num, data] = line.split(':');
      const gameNum = +num.match(/\d+/)[0];
      const gameData = data
        .trim()
        .split(';')
        .map((game) =>
          game
            .trim()
            .split(', ')
            .reduce((obj, set) => {
              const [count, color] = set.split(' ');
              obj[color] = Number(count);
              return obj;
            }, {})
        );
      return { gameNum, gameData };
    });


const input = crunchInput();

export const firstPart = (): number => getPossibleGamesSum(input, 12, 13, 14);
export const secondPart = (): number => getGamesPower(input);
