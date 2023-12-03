import { filter, find } from "lodash-es";
import { getInput } from "../../utils/index.js";

interface Part {
  value: string;
  x: number;
  line: number;
}

const partNumbers: Array<Part> = [];
const partSymbols: Array<Part> = [];

const getSum = (): number => {
  let sum = 0;
  partNumbers.forEach((num) => {
    const isSymbolBefore = !!find(partSymbols, { x: num.x - 1, line: num.line })
    const isSymbolAfter = !!find(partSymbols, { x: num.x + num.value.length, line: num.line })
    const isSymbolAbove = !!find(partSymbols, (sym: Part) => (sym.line === num.line - 1) && ((sym.x >= num.x - 1) && (sym.x <= (num.x + num.value.length))));
    const isSymbolBelow = !!find(partSymbols, (sym: Part) => (sym.line === num.line + 1) && ((sym.x >= num.x - 1) && (sym.x <= (num.x + num.value.length))));
    sum += (isSymbolAbove || isSymbolBelow || isSymbolBefore || isSymbolAfter) ? +num.value : 0;
  });
  return sum;
}

const getRatio = (): number => {
  let ratio = 0;

  partSymbols.filter(v => v.value === '*').forEach((sym) => {
    const numBefore = filter(partNumbers, (num: Part) => (num.line === sym.line) && (num.x + num.value.length === sym.x))
    const numAfter = filter(partNumbers, (num: Part) => (num.line === sym.line) && (num.x === sym.x + 1))
    const numsAbove = filter(partNumbers, (num: Part) => (num.line === sym.line - 1) && (sym.x >= num.x - 1) && (sym.x <= num.x + num.value.length));
    const numsBelow = filter(partNumbers, (num: Part) => (num.line === sym.line + 1) && (sym.x >= num.x - 1) && (sym.x <= num.x + num.value.length));

    const numbers: number[] = [
      ...numBefore.map(n => +n.value),
      ...numAfter.map(n => +n.value),
      ...numsAbove.map(n => +n.value),
      ...numsBelow.map(n => +n.value),
    ];

    ratio += (numbers.length === 2) ? numbers[0] * numbers[1] : 0;
  });
  return ratio;
}

// crunching input: 
// getting objects for symbols and numbers
const crunchInput = () => {
  const lines = getInput(2023, 3).split('\n');
  lines.forEach((line: string, numLine: number) => {

    for (const match of line.matchAll(/\d+/g)) {
      partNumbers.push({
        value: match[0],
        x: match.index,
        line: numLine,
      });
    }

    for (let i = 0; i < line.length; i++) {
      if (line[i] !== '.' && isNaN(+line[i])) {
        partSymbols.push({
          value: line[i],
          x: i,
          line: numLine,
        });
      }
    }
  });
};

crunchInput();

export const firstPart = (): number => getSum();
export const secondPart = (): number => getRatio();
