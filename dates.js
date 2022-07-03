#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: 'y',
    type: 'boolean',
    description: 'current year',
    default: false
  })
  .option('month', {
    alias: 'm',
    type: 'boolean',
    description: 'current month',
    default: false
  })
  .option('date', {
    alias: 'd',
    type: 'boolean',
    description: 'current day',
    default: false
  })
  .argv

const currentDate = new Date()

const dateObj = {
  current: currentDate.toISOString(),
  currentYear: currentDate.getFullYear(),
  currentMonth: currentDate.getMonth(),
  currentDay: currentDate.getDate(),
}

if (argv._.includes('current')) {
  if (!argv.year && !argv.month && !argv.date) {
    console.log(dateObj.current)
  }

  if (argv.year) {
    console.log(dateObj.currentYear)
  }

  if (argv.month) {
    console.log(dateObj.currentMonth + 1)
  }

  if (argv.date) {
    console.log(dateObj.currentDay)
  }
}
const isAdd = argv._.includes('add');
const isSub = argv._.includes('sub');

if (isAdd || isSub) {
  let dateNow = currentDate;
  const actionIdx = argv._.findIndex((item) => item === 'add' || item === 'sub') + 1
  const numsToAdd = argv._[actionIdx];
  console.log()

  if (argv.year) {
    isAdd
      ? dateNow = new Date(
      dateObj.currentYear + numsToAdd,
      dateObj.currentMonth,
      dateObj.currentDay).toISOString()
      : dateNow = new Date(
        dateObj.currentYear - numsToAdd,
        dateObj.currentMonth,
        dateObj.currentDay).toISOString()
  }

  if (argv.month) {
    isAdd
      ? dateNow = new Date(
        dateObj.currentYear,
        dateObj.currentMonth + numsToAdd,
        dateObj.currentDay).toISOString()
      : dateNow = new Date(
        dateObj.currentYear,
        dateObj.currentMonth - numsToAdd,
        dateObj.currentDay).toISOString()
  }

  if (argv.date) {
    isAdd
      ? dateNow = new Date(
        dateObj.currentYear,
        dateObj.currentMonth,
        dateObj.currentDay + numsToAdd).toISOString()
      : dateNow = new Date(
        dateObj.currentYear,
        dateObj.currentMonth,
        dateObj.currentDay - numsToAdd).toISOString()
  }

  console.log(dateNow)
}
