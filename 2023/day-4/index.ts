import { getInput } from "../../utils/index.js";

interface Card {
  cardNum: number;
  winning: Array<number>;
  yours: Array<number>;
}

const getWinnings = (cards: Array<Card>): number =>
  cards
    .map((card) => card.winning.filter((num) => card.yours.includes(num)))
    .reduce((acc, winnings) => acc + ((winnings.length > 0) ? Math.pow(2, winnings.length - 1) : 0), 0);

const getCardsCount = (cards: Array<Card>): number => {
  // starting cards
  const cardsCount: number[] = new Array(cards.length).fill(1);
  // for each card we increment the count of the following cards, according to the wins
  cards.forEach((card, index) => {
    const wins = card.winning.filter((num) => card.yours.includes(num)).length;
    for (let i = 1; i <= wins; i++) {
      cardsCount[index + i] += cardsCount[index];
    }
  });

  return cardsCount.reduce((a, b) => a + b, 0);
}

const crunchInput = (): Array<Card> => {
  const lines = getInput(2023, 4).split('\n');
  return lines.map((line) => {
    const [num, card] = line.split(': ');
    const cardNum = +num.match(/\d+/)[0];
    const [w, y] = card.split(' | ');
    const winning = w.match(/\d+/g).map(n => +n);
    const yours = y.match(/\d+/g).map(n => +n);
    return {
      cardNum,
      winning,
      yours
    }
  });
}

// crunching input
const cards: Array<Card> = crunchInput();

export const firstPart = (): number => getWinnings(cards);
export const secondPart = (): number => getCardsCount(cards);
