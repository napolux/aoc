import { find } from "lodash-es";
import { getInput } from "../../utils/index.js";

interface PartNumber {
  value: string;
  start: number;
  line: number;
}

interface PartSymbol {
  value: string;
  x: number;
  line: number;
}

const partNumbers: Array<PartNumber> = [];
const partSymbols: Array<PartSymbol> = [];

const getSum = (): number => {
  let sum = 0;
  partNumbers.forEach((num) => {
    const isSymbolBefore = !!find(partSymbols, { x: num.start - 1, line: num.line })
    const isSymbolAfter = !!find(partSymbols, { x: num.start + num.value.length, line: num.line })
    const isSymbolAbove = !!find(partSymbols, (sym: PartSymbol) => (sym.line === num.line - 1) && ((sym.x >= num.start - 1) && (sym.x <= (num.start + num.value.length))));
    const isSymbolBelow = !!find(partSymbols, (sym: PartSymbol) => (sym.line === num.line + 1) && ((sym.x >= num.start - 1) && (sym.x <= (num.start + num.value.length))));

    sum += (isSymbolAbove || isSymbolBelow || isSymbolBefore || isSymbolAfter) ? +num.value : 0;
  });
  return sum;
}

// crunching input: 
// getting an object with game number and games
const crunchInput = () => {
  const lines = getInput(2023, 3).split('\n');
  lines.forEach((line: string, numLine: number) => {

    for (const match of line.matchAll(/\d+/g)) {
      partNumbers.push({
        value: match[0],
        start: match.index,
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

export const secondPart = (): number => 0;
