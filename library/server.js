const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3002;

const routes = require('./routes');

app.use(routes);

app.use('/public', express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

const urlDb = 'mongodb://root:example@mongo:27017/';

(async function () {
  try {
    await mongoose.connect(urlDb, {
      dbName: 'books',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('mongodb connected');
  } catch (e) {
    console.log(e);
  }
})()

app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log(`Server lib - on port ${PORT}`);
})
