const path = require('path');
const fs = require('fs');

const fileName = process.argv.slice(2)[0];
const { dir } = path.parse(__dirname);

fs.readFile(`${dir}/task-1/${fileName}.txt`, 'utf8', (err, data) => {
  if (err) throw err;
  const array = data.trim().split('\n');
  const win = +array.filter(item => item === 'true').length;
  const lose = +array.filter(item => item === 'false').length;
  const percent= (win / (win + lose) * 100);

  console.log('общее количество партий:', array.length);
  console.log('количество выигранных/проигранных партий:', `${win}/${lose}`);
  console.log('процентное соотношение выигранных партий:', `${percent.toFixed(1)}%`);
});