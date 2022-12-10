import { getInput } from '../../utils/index.js';

const NOOP = 'noop';
const ADDX = 'addx';

const getRegisterValue = (input: string[]): number => {
  let registerValue = 1;
  let signal = 0;

  input.forEach((value, index) => {
    const instruction = value.split(' ');
    if (index === 20 || (index > 20 && ((index - 20) % 40) === 0)) {
      signal += index * registerValue;
    }
    switch (instruction[0]) {
      case ADDX:
        registerValue = registerValue + parseInt(instruction[1]);
        break;
      case NOOP:
      default:
        break;
    }
  })
  return signal;
}

const canBeDrawn = (registerValue: number, index: number, row: number): boolean => {
  const adjustedValue = registerValue + (40 * row);
  return (index >= adjustedValue - 1 && index <= adjustedValue + 1);
}

const getScreenValue = (input: string[]) => {
  let registerValue = 1;
  let row = 0;
  input.forEach((value, index) => {
    // this should not be here, but it works 🤷
    if (index === 240) return;
    // adding a new line
    if (index > 0 && index % 40 === 0) {
      process.stdout.write('\n');
      row++;
    }
    const instruction = value.split(' ');
    switch (instruction[0]) {
      case ADDX:
        registerValue = registerValue + parseInt(instruction[1]);
        break;
      case NOOP:
      default:
        break;
    }
    process.stdout.write((canBeDrawn(registerValue, index, row)) ? '#' : '.');
  });
  return '';
}

// crunching input
const input = getInput(2022, 10)
  // one instruction to two
  .replaceAll(ADDX, `${NOOP}\n${ADDX}`)
  .split('\n');

// adding one NOOP on top in order to align indexes
export const firstPart = (): number => getRegisterValue([NOOP, ...input]);
// no need for NOOP on top
export const secondPart = () => getScreenValue([NOOP, ...input]);
