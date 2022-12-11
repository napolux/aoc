import { getInput } from '../../utils/index.js';

const FIRST_PART_ROUNDS = 20;
const SECOND_PART_ROUNDS = 10000;

interface Monkey {
  items: number[];
  operation: string;
  test: number;
  testTrue: number;
  testFalse: number;
  activity: number;
}

const getItems = (monkey: string): number[] => monkey.split('\n')[1]
  .replace('Starting items: ', '')
  .replaceAll(', ', ',')
  .split(',')
  .map(item => parseInt(item));

const getOperation = (monkey: string): string => monkey.split('\n')[2]
  .replace('Operation: new = ', '').trim();

const getTest = (monkey: string): number => parseInt(monkey.split('\n')[3]
  .replace('Test: divisible by ', ''))

const getTestTrue = (monkey: string): number => parseInt(monkey.split('\n')[4]
  .replace('If true: throw to monkey', ''));

const getTestFalse = (monkey: string): number => parseInt(monkey.split('\n')[5]
  .replace('If false: throw to monkey', ''))

// crunching input
const getMonkeys = (input: string): Monkey[] => {
  const sections = input.split('\n\n');
  return sections.map(monkey => {
    return {
      items: getItems(monkey),
      operation: getOperation(monkey),
      test: getTest(monkey),
      testTrue: getTestTrue(monkey),
      testFalse: getTestFalse(monkey),
      activity: 0,
    }
  });
}

const runMonkeyBusiness = (monkeys: Monkey[], rounds = FIRST_PART_ROUNDS) => {
  const multiModule = monkeys.map(m => m.test).reduce((a, b) => a * b, 1);
  for (let i = 0; i < rounds; i++) {
    // run all the inspections for each monkey
    for (let j = 0; j < monkeys.length; j++) {
      monkeys[j].items.forEach(item => {
        const operation = monkeys[j].operation.replaceAll('old', item.toString());
        let newItemValue;
        if (rounds === FIRST_PART_ROUNDS) {
          newItemValue = Math.floor(Number(eval(operation)) / 3);
        } else {
          newItemValue = Number(eval(operation)) % multiModule;
        }
        if (newItemValue % monkeys[j].test === 0) {
          monkeys[monkeys[j].testTrue].items.push(newItemValue);
        } else {
          monkeys[monkeys[j].testFalse].items.push(newItemValue);
        }
        monkeys[j].activity++;
      });
      monkeys[j].items = [];
    }
  }
  return monkeys;
}

export const firstPart = () => {
  const monkeys = getMonkeys(getInput(2022, 11));
  const activities = runMonkeyBusiness(monkeys, FIRST_PART_ROUNDS)
    .map(m => m.activity).sort((a, b) => a - b);
  return activities
    .slice(-2)
    .reduce((a, b) => a * b, 1);
};
export const secondPart = () => {
  const monkeys = getMonkeys(getInput(2022, 11));
  const activities = runMonkeyBusiness(monkeys, SECOND_PART_ROUNDS)
    .map(m => m.activity).sort((a, b) => a - b);
  return activities
    .slice(-2)
    .reduce((a, b) => a * b, 1);
};
