const express = require('express');
const route = express.Router();
const booksRoutes = require('./books');
const userRoutes = require('./user');

route.use(booksRoutes);
route.use(userRoutes);
route.get('/', (req, res) => {
  res.render('index', { title: 'Main' });
});


module.exports = route;