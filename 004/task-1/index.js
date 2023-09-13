const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');

const fileName = process.argv.slice(2)[0];
const rl = readline.createInterface({ input, output });

const min = 1;
const max = 2;

fs.readFile(`${fileName}.txt`, 'utf8', (err, data) => {
  if(err) throw err;
  console.log(data);
});

console.log('Угадайте число от 1 до 2');

rl.on('line', input => {
  let random = Math.floor(Math.random() * (max - min) + min);
  console.log(random)
  if (+input === random) {
    console.log('Угадали');
  } else {
    console.log('Не угадали');
  }
  random = Math.floor(Math.random() * (max - min) + min);
  console.log(random)

  fs.appendFile(`${fileName}.txt`, `${+input === random} /n`, (error) =>{
    if(error) throw error;

    // let data = fs.readFileSync(`${fileName}.txt`, "utf8");
    // console.log(data);  // выводим считанные данные
  });
});