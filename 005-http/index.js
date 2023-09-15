const http = require('node:http');
const { defaultCity, accessKey } = require('./config');
const city = process.argv.slice(2)[0];

const api = 'http://api.weatherstack.com/current';
const query = `query=${city ? city : defaultCity}`;
const url = `${api}?${accessKey}&${query}`;

http.get(url, async res => {
  const { statusCode } = res;
  if (statusCode !== 200) {
    console.log(`statusCode: ${statusCode}`)
    return;
  }

  let resData = '';
  res.on('data', chunk => resData += chunk);
  res.on('end', () => {
    let parseData = JSON.parse(resData);
    console.log(parseData);
  });
}).on('error', (err) => {
  console.error(err)
})