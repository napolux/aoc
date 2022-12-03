import { chunk } from 'lodash-es';
import { input } from './resources/input.js';

// list of possible items in a rucksack
const ITEMS_MAP: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getDuplicateItemsCount = (rucksacks: string[]): number => {
  const duplicate = rucksacks.map(rucksack => {
    // the rucksack has 2 compartments
    const firstComp = rucksack.slice(0, rucksack.length / 2);
    const secondComp = rucksack.slice(rucksack.length / 2);

    // we get compartment size
    const compSize = firstComp.length;

    // we search for the very first item that is in both compartments and then we quit searching
    for (let i = 0; i < compSize; i++) {
      for (let j = 0; j < compSize; j++) {
        if (firstComp[i] === secondComp[j]) {
          return firstComp[i];
        }
      }
    }
  });

  return duplicate.map(item => ITEMS_MAP.indexOf(item) + 1).reduce((a, b) => a + b, 0);
};

const findBadgesCount = (rucksacks: string[]): number => {
  const groups = chunk(rucksacks, 3);
  const badges = [];

  groups.forEach(group => {
    // for each group, we search for the only item available in each elf rucksack
    const badge: string = ITEMS_MAP.split('').filter(item =>
      group[0].indexOf(item) !== -1 &&
      group[1].indexOf(item) !== -1 &&
      group[2].indexOf(item) !== -1
    ).shift();
    badges.push(ITEMS_MAP.indexOf(badge) + 1)
  });

  return badges.reduce((a, b) => a + b, 0);
}

// crunching input
const rucksacks = input.split('\n');

export const firstPart = (): number => getDuplicateItemsCount(rucksacks);
export const secondPart = (): number => findBadgesCount(rucksacks);
