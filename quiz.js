#!/usr/bin/env node
const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');

const randomNumber = Math.floor(Math.random() * 100)

const rl = readline.createInterface({input, output});
console.log('Загадано число от 0 до 100')
const quiz = () => {
  rl.question('', (answer => {
    if (+answer === randomNumber) {
      console.log('Вы угадали')
      rl.close()
    } else if (answer < randomNumber) {
      console.log('Больше')
      quiz()
    } else if (answer > randomNumber) {
      console.log('Меньше')
      quiz()
    }
  }))
}

quiz()


