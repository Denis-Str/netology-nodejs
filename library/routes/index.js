const express = require('express');
const routes = express.Router();

const booksRoutes = require('./books');

routes.use(booksRoutes);

module.exports = routes;