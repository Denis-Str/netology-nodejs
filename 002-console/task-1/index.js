#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { _: {[0]: type} } = argv;
const dateType = Object.keys(argv)[1];
const value = argv[dateType];

const date = new Date();

const getDate = (dateType) => {
  if (['year', 'y'].includes(dateType)) return date.getFullYear();
  if (['month', 'm'].includes(dateType)) return date.getMonth();
  if (['date', 'd'].includes(dateType)) return date.getDate();
  return date;
};

const setDate = (dateType) => {
  const diff = type === 'add' ? getDate(dateType) + value : getDate(dateType) - value;
  if (['year', 'y'].includes(dateType)) return date.setFullYear(diff);
  if (['month', 'm'].includes(dateType)) return date.setMonth(diff);
  if (['date', 'd'].includes(dateType)) return date.setDate(diff);
  return 'setDate';
}

if (type === 'current') console.log(getDate(dateType));

if (type === 'add') {
  const newDate = setDate(dateType);
  console.log(new Date(newDate).toISOString());
}

if (type === 'sub') {
  const newDate = setDate(dateType);
  console.log(new Date(newDate).toISOString());
}