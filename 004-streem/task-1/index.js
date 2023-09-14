const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');
const path = require('path');

const fileName = process.argv.slice(2)[0];
const rl = readline.createInterface({ input, output });
const file = path.join(__dirname, '', `${fileName}.txt`);

const min = 1;
const max = 3;

const writeResult = (content) => {
  fs.appendFile(file, `${content}\n`, (err) => {
    if (err) throw err;
  })
}

console.log('Угадайте число от 1 до 2');

rl.on('line', input => {
  const random = Math.floor(Math.random() * (max - min) + min);

  if (+input === random) console.log('Угадали')
  else console.log('Не угадали');

  writeResult(+input === random);
});
