#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

const loggerPath = path.join(__dirname, 'logger.json')

fs.readFile(loggerPath, {encoding: "utf-8"}, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    const parsed = JSON.parse(data)

    const total = parsed.games.length
    const wins = parsed.games.filter((data) => data).length
    const losses = parsed.games.filter((data) => !data).length
    const percents = `${Math.floor((wins / total) * 100)}%`
    
    console.table(
      {
        "Всего игр": total,
        "Проиграно игр": losses,
        "Выйгранно игр": wins,
        "Выйграно игр, %": percents
      }
    )
  }
})
