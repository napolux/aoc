import chalk from 'chalk';
const [year, day] = process.argv.slice(2);

const days = (s: any) => console.log(chalk.bold.italic.whiteBright(s));
const title = (s: any) => console.log(chalk.bold.redBright(s));
const solution = (s: any) => console.log(chalk.green(s));
const timer = (s: any) => chalk.italic.yellow(s);

if (!year || !day) {
  console.error('Missing arguments! Run this with `yarn solve <year> <day>`');
  process.exit(1);
}

// TODO: not really happy with this, but who cares
const { firstPart, secondPart } = await import(`./${year}/day-${day}/index.js`);

console.clear();
days(`🎄 Advent of Code ${year}, day ${day} 🎁`)

console.time(timer('Execution time'));

title('First part solution...')
solution(firstPart());
title('Second part solution...')
solution(secondPart());
console.timeEnd(timer('Execution time'));

export { };

