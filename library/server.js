const express = require('express');
const app = express();
const PORT= 3000;
const HOST= "localhost";
const routes = require('./routes');

app.use(routes);
app.use(express.json());
app.use('/public', express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

app.listen(PORT, HOST, (error) => {
  if (error) console.log(error);
  else console.log(`Server started - http://${HOST}:${PORT}`);
})
