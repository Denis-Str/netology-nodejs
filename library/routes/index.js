const express = require('express');
const routes = express.Router();
const booksRoutes = require('./books');
const userRoutes = require('./user');

routes.use(booksRoutes);
routes.use(userRoutes);
routes.get('/', (req, res) => {
  res.render('index', { title: 'Main' });
});


module.exports = routes;