const config = require('./config');
const http = require('http');
console.log(process.env)
const apiKey = process.env.API_KEY || config.DEFAULT_API_KEY;
const city = process.env.CITY || config.DEFAULT_CITY;

const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

http.get(url, (res) => {
  if (res.statusCode === 200) {
    res.setEncoding('utf-8')
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      const parsedData = JSON.parse(rawData)

      const { name } = parsedData.location;
      const { temperature, humidity} = parsedData.current;

      console.table([
        {
          'Город': name,
          'Температура': `${temperature}C`,
          'Влажность': `${humidity}%`,
        }
      ])
    })
  } else {
    console.log('Некорректный запрос')
  }
}).on('error', (err) => {
  console.error(err)
})
