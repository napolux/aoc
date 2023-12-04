import { getInput } from "../../utils/index.js";

interface Card {
  gameNum: number;
  winning: Array<number>;
  yours: Array<number>;
}

const getWinnings = (cards: Array<Card>): number =>
  cards
    .map((card) => card.winning.filter((num) => card.yours.includes(num)))
    .reduce((acc, winnings) => acc + ((winnings.length > 0) ? Math.pow(2, winnings.length - 1) : 0), 0);

// const getCards = (games: Array<Card>): number => {
//   const stack = 
// }

const crunchInput = (): Array<Card> => {
  const lines = getInput(2023, 4).split('\n');
  return lines.map((line) => {
    const [num, card] = line.split(': ');
    const gameNum = +num.match(/\d+/)[0];
    const [w, y] = card.split(' | ');
    const winning = w.match(/\d+/g).map(n => +n);
    const yours = y.match(/\d+/g).map(n => +n);
    return {
      gameNum,
      winning,
      yours
    }
  });
}

// crunching input
const cards: Array<Card> = crunchInput();

export const firstPart = (): number => getWinnings(cards);
export const secondPart = (): number => 0;// getCoordinates(secondInput);
