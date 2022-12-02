import chalk from 'chalk';
const [year, day] = process.argv.slice(2);

const title = (s: unknown) => console.log(chalk.bold.redBright(s));
const solution = (s: unknown) => console.log(chalk.green(s));

if (!year || !day) {
  console.error('Missing arguments! Run this with `yarn solve <year> <day>`');
  process.exit(1);
}

// TODO: not really happy with this, but who cares
const { firstPart, secondPart } = await import(`./${year}/day-${day}/index.js`);

title('First part solution...')
solution(firstPart());
title('Second part solution...')
solution(secondPart());

export { };

