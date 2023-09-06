#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { _: {[0]: type} } = argv;
const dateType = Object.keys(argv)[1];
const value = argv[dateType];

const date = new Date();

// console.log(type, dateType, value)
// console.log(argv)
// console.log(value)
const getDate = (dateType) => {
  switch (dateType) {
    case ('year' || 'y'):
      return date.getFullYear();
    case ('month' || 'm'):
      return date.getMonth();
    case ('date' || 'd'):
      return date.getDate();
    default:
      return date;
  }
}
const setDate = (dateType) => {
  switch (dateType) {
    case ('year' || 'y'):
      return 'setFullYear';
    case ('month' || 'm'):
      return 'setMonth';
    case ('date' || 'd'):
      return 'setDate';
    default:
      return 'setDate';
  }
}

if (type === 'current') console.log(getDate(dateType));

if (type === 'add') {
  const newDate = date[`${setDate(dateType)}`](getDate(dateType) + value);
  console.log(new Date(newDate).toISOString());
}

if (type === 'sub') {
  const newDate = date[`${setDate(dateType)}`](getDate(dateType) - value);
  console.log(new Date(newDate).toISOString());
}