const express = require('express');
const app = express();
const PORT= process.env.PORT || 3002;

const routes = require('./routes');

app.use(routes);

app.use('/public', express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log(`Server lib - on port ${PORT}`);
})
