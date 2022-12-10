import { map } from 'lodash-es';
import { getInput } from '../../utils/index.js';

const NOOP = 'noop';
const ADDX = 'addx';

const getRegisterValue = (input: number[]): number => {
  let registerValue = 1;
  let realIndex = 1;
  let signal = 0;
  input.forEach((value) => {
    if (realIndex === 20 || (realIndex > 20 && ((realIndex - 20) % 40) === 0)) {
      signal += realIndex * registerValue;
    }
    registerValue = registerValue + value;
    realIndex++;
  })
  return signal;
}

const canBeDrawn = (registerValue: number, index: number, row: number): boolean => {
  const adjustedValue = registerValue + (40 * row);
  return (index >= adjustedValue - 1 && index <= adjustedValue + 1);
}

const getScreenValue = (input: number[]) => {
  let registerValue = 1;
  let row = 0;
  input.forEach((value, index) => {
    process.stdout.write((canBeDrawn(registerValue, index, row)) ? '#' : '.');
    if (index > 0 && (index + 1) % 40 === 0) {
      process.stdout.write('\n');
      row++;
    }
    registerValue = registerValue + value;
  });
  return '';
}

// crunching input
const input = getInput(2022, 10)
  // one instruction to two
  .replaceAll(ADDX, `${NOOP}\n${ADDX}`)
  .replaceAll(NOOP, `${ADDX} 0`)
  .split('\n').map(instruction => parseInt(instruction.split(' ')[1]));

// adding one NOOP on top in order to align indexes
export const firstPart = (): number => getRegisterValue(input);
// no need for NOOP on top
export const secondPart = () => getScreenValue(input);
