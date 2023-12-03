import { find } from "lodash-es";
import { getInput } from "../../utils/index.js";

interface Part {
  value: string;
  x: number;
  line: number;
}

const getSum = (partNumbers: Array<Part>, partSymbols: Array<Part>): number =>
  partNumbers.reduce((acc, num) => {
    const isSymbolBefore = !!find(partSymbols, { x: num.x - 1, line: num.line })
    const isSymbolAfter = !!find(partSymbols, { x: num.x + num.value.length, line: num.line })
    const isSymbolAbove = partSymbols.some((sym: Part) => (sym.line === num.line - 1) && ((sym.x >= num.x - 1) && (sym.x <= (num.x + num.value.length))));
    const isSymbolBelow = partSymbols.some((sym: Part) => (sym.line === num.line + 1) && ((sym.x >= num.x - 1) && (sym.x <= (num.x + num.value.length))));
    return acc + ((isSymbolAbove || isSymbolBelow || isSymbolBefore || isSymbolAfter) ? +num.value : 0);
  }, 0);

const getRatio = (partNumbers: Array<Part>, partSymbols: Array<Part>): number =>
  partSymbols.filter(v => v.value === '*').reduce((acc, sym) => {
    const numBefore = partNumbers.filter((num: Part) => (num.line === sym.line) && (num.x + num.value.length === sym.x))
    const numAfter = partNumbers.filter((num: Part) => (num.line === sym.line) && (num.x === sym.x + 1))
    const numsAbove = partNumbers.filter((num: Part) => (num.line === sym.line - 1) && (sym.x >= num.x - 1) && (sym.x <= num.x + num.value.length));
    const numsBelow = partNumbers.filter((num: Part) => (num.line === sym.line + 1) && (sym.x >= num.x - 1) && (sym.x <= num.x + num.value.length));

    const numbers: number[] = [
      ...[numBefore, numAfter, numsAbove, numsBelow].flatMap((nums) => nums.map((n) => +n.value)),
    ];
    return acc + ((numbers.length === 2) ? numbers[0] * numbers[1] : 0);
  }, 0);

// crunching input: 
// getting objects for symbols and numbers
const crunchInput = () => {
  const partNumbers: Array<Part> = [];
  const partSymbols: Array<Part> = [];
  const lines = getInput(2023, 3).split('\n');

  lines.forEach((line: string, numLine: number) => {
    line.replace(/\d+/g, (value, index) => {
      partNumbers.push({ value, x: index, line: numLine });
      return '';
    });

    line.split('').forEach((char, index) => {
      if (char !== '.' && isNaN(+char)) {
        partSymbols.push({ value: char, x: index, line: numLine });
      }
    });
  });
  return { partNumbers, partSymbols }
};

const { partNumbers, partSymbols } = crunchInput();

export const firstPart = (): number => getSum(partNumbers, partSymbols);
export const secondPart = (): number => getRatio(partNumbers, partSymbols);
