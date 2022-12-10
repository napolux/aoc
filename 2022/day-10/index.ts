import { getInput } from '../../utils/index.js';

const NOOP = 'noop';
const ADDX = 'addx';

const SCREEN_WIDTH = 40;

const getRegisterValue = (input: number[]): number => {
  let registerValue = 1;
  let signal = 0;
  input.forEach((value, index) => {
    // this is for brevity, since the problem considers indexes starting at 1
    const adjustedIndex = index + 1;
    if (adjustedIndex === 20 || (adjustedIndex > 20 && ((adjustedIndex - 20) % 40) === 0)) {
      signal += adjustedIndex * registerValue;
    }
    registerValue = registerValue + value;
  })
  return signal;
}

/**
 * Check if that given the current system state a pixel can be drawn or not
 * @param registerValue the current register value
 * @param index where we are in code execution
 * @param row the display row we're writing
 * @returns if a pixel is lit or not
 */
const canBeDrawn = (registerValue: number, index: number, row: number): boolean => {
  const adjustedValue = registerValue + (40 * row);
  // the register value is in the middle of the sprite, so any value before and after is also ok
  return (index >= adjustedValue - 1 && index <= adjustedValue + 1);
}

const printScreenFromRegister = (input: number[]) => {
  let registerValue = 1;
  let row = 0;
  input.forEach((value, index) => {
    process.stdout.write((canBeDrawn(registerValue, index, row)) ? '#' : ' ');
    // adding a new line at column 40
    if ((index + 1) % SCREEN_WIDTH === 0) {
      process.stdout.write('\n');
      row++;
    }
    registerValue = registerValue + value;
  });
}

// crunching input
const input = getInput(2022, 10)
  // one instruction to two
  .replaceAll(ADDX, `${NOOP}\n${ADDX}`)
  // a noop is just addx 0
  .replaceAll(NOOP, `${ADDX} 0`)
  // getting values from all the addx
  .split('\n').map(instruction => parseInt(instruction.split(' ')[1]));

export const firstPart = (): number => getRegisterValue(input);
export const secondPart = () => printScreenFromRegister(input);
