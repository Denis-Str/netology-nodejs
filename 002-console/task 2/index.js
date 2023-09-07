const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const min = 0;
const max = 10;
const getRandomNumber = (() => Math.floor(Math.random() * (max - min) + min))();
console.log('Загадано число в диапазоне от 0 до 10');

rl.on('line', (input) => {
  +input < getRandomNumber ? console.log('Больше') : console.log('Меньше');
  if (+input === getRandomNumber) {
    console.log(`Отгадано число: ${input}`);
    rl.close();
  }
});



