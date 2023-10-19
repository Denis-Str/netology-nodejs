const http = require("node:http");

const fetchCounter = id => {
  const options = {
    host: 'counter',
    port: 3001,
    path: `/counter/${id}/incr`,
    method: 'POST',
  };

  http.request(options, (res) => {
    let rawData = '';
    res.resume();
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      if (!res.complete) console.error('server error 500');
      try {
        const {  count } = JSON.parse(rawData);
        console.log('fetchCounter',  count);
        return  count;
      } catch (e) {
        console.error(e.message);
      }
    })
  })
}

const getCounter = id => {
  http.get(`http://counter:3001/counter/${id}`, async res => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log(`statusCode: ${statusCode}`)
      return;
    }

    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const { count } = JSON.parse(rawData);
        console.log('getCounter', count);
        return count;
      } catch (e) {
        console.error(e.message);
      }
    });
  })
    .on('error', (err) => {
      console.error(err)
    })
}

module.exports = {
  fetchCounter,
  getCounter
}