import { input } from './resources/input.js';

const charMap: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRucksacksDuplicatedItemsCount = (rucksacks: string[][]): number => {
  const splitRucksacks = rucksacks.map(r => [
    r.slice(0, r.length / 2).sort(),
    r.slice((r.length / 2), r.length).sort(),
  ]);

  const result = splitRucksacks.map(split => {
    const first = split[0];
    const second = split[1];
    const size = first.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (first[i] === second[j]) {
          return first[i];
        }
      }
    }
  });
  return result.map(char => charMap.indexOf(char) + 1).reduce((a, b) => a + b, 0);
};

const findBadges = (rucksacks: string[]): number => {
  const badges = [];
  const size = rucksacks.length - 3;

  for (let i = 0; i <= size; i = i + 3) {
    const firstElf = rucksacks[i];
    const secondElf = rucksacks[i + 1];
    const thirdElf = rucksacks[i + 2];

    const badge: string = charMap.split('').filter(char =>
      firstElf.indexOf(char) !== -1 &&
      secondElf.indexOf(char) !== -1 &&
      thirdElf.indexOf(char) !== -1
    )[0];
    badges.push(charMap.indexOf(badge) + 1)
  }
  return badges.reduce((a, b) => a + b, 0);
}

// crunching input
const rucksacks = input.split("\n");

export const firstPart = () => getRucksacksDuplicatedItemsCount(rucksacks.map(rucksack => rucksack.split('')));
export const secondPart = (): number => findBadges(rucksacks);
