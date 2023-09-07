#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('current', {
    type: 'string',
    description: 'Текущая дата и время'
  })
  .option('add', {
    type: 'string',
    description: 'Даты в будущем',
  })
  .option('sub', {
    type: 'string',
    description: 'Даты в прошлом',
  })
  .argv
const { _: type } = argv;

const cmds = ['sub', 'add', 'current'];
const task = type.find(cmd => cmds.includes(cmd));
const dateType = Object.keys(argv)[1];
const value = argv[dateType];

const date = new Date();

const methods = () => {
  if (['year', 'y'].includes(dateType)) return 'FullYear';
  if (['month', 'm'].includes(dateType)) return 'Month';
  if (['date', 'd'].includes(dateType)) return 'Date';
  return null;
}
const getDate = () => methods() ?  date[`get${methods()}`]() : date;
const diff = () => task === 'add' ? new Date(getDate() + value) : new Date(getDate() - value);
const setDate = () => methods() ?  date[`set${methods()}`](diff()) : date;

const result= task === 'current' ? getDate() : new Date(setDate());
console.log(result);