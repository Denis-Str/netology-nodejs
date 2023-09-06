#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { _: {[0]: type} } = argv;
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
const diff = () => type === 'add' ? new Date(getDate() + value) : new Date(getDate() - value);
const setDate = () => methods() ?  date[`set${methods()}`](diff()) : date;

if (type === 'current') console.log(getDate());
if (type === 'add') console.log(new Date(setDate()).toISOString());
if (type === 'sub') console.log(new Date(setDate()).toISOString());