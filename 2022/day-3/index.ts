import { chunk } from 'lodash-es';
import { input } from './resources/input.js';

const charMap: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRucksacksDuplicatedItemsCount = (rucksacks: string[][]): number => {
  const splitRucksacks = rucksacks.map(r => [
    r.slice(0, r.length / 2),
    r.slice(r.length / 2),
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

const findBadgesCount = (rucksacks: string[]): number => {
  const groups = chunk(rucksacks, 3);
  const badges = [];

  groups.forEach(group => {
    // for each group, we search for the only char available in each elf rucksack
    const badge: string = charMap.split('').filter(char =>
      group[0].indexOf(char) !== -1 &&
      group[1].indexOf(char) !== -1 &&
      group[2].indexOf(char) !== -1
    ).shift();
    badges.push(charMap.indexOf(badge) + 1)
  });

  return badges.reduce((a, b) => a + b, 0);
}

// crunching input
const rucksacks = input.split("\n");

export const firstPart = () => getRucksacksDuplicatedItemsCount(rucksacks.map(rucksack => rucksack.split('')));
export const secondPart = (): number => findBadgesCount(rucksacks);
