import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getInput = (year: number, day: number): string =>
  fs.readFileSync(`${__dirname}/../../${year}/day-${day}/resources/input.txt`, { encoding: 'utf8', flag: 'r' });
