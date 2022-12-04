import { chunk } from 'lodash-es';
import { getInput } from '../../utils/index.js';

// list of possible items in a rucksack
const ITEMS_MAP = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

const findBadgesCount = (groups: string[][]): number => {
  const badges = [];

  // for each group, we search for the only item available in each elf rucksack
  groups.forEach(group => {
    const badge: string = ITEMS_MAP.split('').filter(item =>
      group[0].includes(item) && group[1].includes(item) && group[2].includes(item)
    ).shift();
    badges.push(ITEMS_MAP.indexOf(badge) + 1)
  });

  return badges.reduce((a: number, b: number) => a + b, 0);
}

// crunching input
const rucksacks = getInput(2022, 3).split('\n');

export const firstPart = (): number => getDuplicateItemsCount(rucksacks);
export const secondPart = (): number => findBadgesCount(chunk(rucksacks, 3));
