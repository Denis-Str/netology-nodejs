#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { _: {[0]: type} } = argv;
const dateType = Object.keys(argv)[1];
const value = argv[dateType];

const date = new Date();
const dateAction = (dateType, action = 'get') => {
  if (dateType === ('year' || 'y')) return `${action}FullYear`;
  if (dateType === ('month' || 'm')) return `${action}Month`;
  if (dateType === ('date' || 'd')) return `${action}Date`;
  return `${action}Date`;
}

if (type === 'current') console.log(date[`${dateAction(dateType)}`]());

if (type === 'add') {
  const newDate = date[`${dateAction(dateType, 'set')}`](date[`${dateAction(dateType)}`]() + value);
  console.log(new Date(newDate).toISOString());
}

if (type === 'sub') {
  const newDate = date[`${dateAction(dateType, 'set')}`](date[`${dateAction(dateType)}`]() - value);
  console.log(new Date(newDate).toISOString());
}