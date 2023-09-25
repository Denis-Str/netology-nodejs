
const express = require('express');
const app = express();
const PORT= 3000;
const HOST= "localhost";

app.use(express.json());
const routes = require('./routes');
app.use(routes);

app.listen(PORT, HOST, (error) => {
  if (error) console.log(error);
  else console.log(`Server started - http://${HOST}:${PORT}`);
})
