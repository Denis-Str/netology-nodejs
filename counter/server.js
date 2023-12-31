const express = require('express');
const redis = require('redis');
const app = express();
const route = express.Router();

const PORT= process.env.PORT || 3001;
const REDIS_URL= process.env.REDIS_URL;

app.use(route);

const client = redis.createClient({
  url: REDIS_URL,
});

(async () => {
  console.log("redis URL:", REDIS_URL);
  try {
    await client.connect();
    console.log('redis connected');
  } catch (error) {
    console.log('redis error:', error);
  }
})();


route.post('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;
  const count = await client.incr(bookId);
  res.json({ count });
});
route.get('/counter/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const count = await client.get(bookId);
    res.json({ count });
  } catch (error) {
    res.json(error);
  }
});

route.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log(`Server counter - on port ${PORT}`);
})
