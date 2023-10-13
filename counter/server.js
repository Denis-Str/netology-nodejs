const express = require('express');
// import { createClient } from 'redis';
const app = express();
const route = express.Router();


const PORT= process.env.PORT || 3001;
// const REDIS_URL= process.env.REDIS_URL;

// const client = redis.createClient({
//   url: REDIS_URL
// });

// (async () => {
//   await client.connect();
// })();

route.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params;
  res.json({ bookId });
});
route.get('/counter/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const count = await client.incr(bookId);
    res.json({ bookId, count });
  } catch (error) {
    res.json(error);
  }
});

route.get('/', (req, res) => {
  res.json('counter');
});


app.listen(PORT,(error) => {
  if (error) console.log(error);
  else console.log(`Server counter - on port ${PORT}`);
})
