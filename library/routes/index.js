const express = require('express');
const routes = express.Router();
const booksRoutes = require('./books');

routes.use(booksRoutes);
routes.get('/', (req, res) => {
  res.render('index', { title: 'Main' });
});


module.exports = routes;