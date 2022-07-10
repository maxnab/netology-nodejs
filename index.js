#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const loggerPath = path.join(__dirname, 'logger.json')

let loggerData;

fs.readFile('logger.json',
  {encoding: 'utf-8'},
  (err, data) => {
    if (err) {
      console.error(err)
    }
    loggerData = JSON.parse(data)
  })

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const game = () => {
  let randomNumber = random(1, 2);
  rl.question('Угадайте число 1 или 2\n', (answer) => {
    if (+answer !== +randomNumber) {
      console.log('Не угадали!')
      loggerData.games.push(false)
    } else {
      console.log('Угадали!')
      loggerData.games.push(true)
    }
    fs.writeFile(loggerPath,
      JSON.stringify(loggerData, null, 2),
      (err) => {
      if (err) console.error(err)
    })
    game()
  });
}

game()

