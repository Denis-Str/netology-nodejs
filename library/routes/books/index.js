const express = require('express');
const {v4: uuid} = require("uuid");
const routes = express.Router();

let books = require("./booksStorage");

routes.post('/api/user/login', (req, res) => {
  const data = { id: 1, mail: "test@mail.ru" };
  res.status(201);
  res.json(data);
});
routes.post('/api/books', (req, res) => {
  books.push({ id: uuid(), ...req.body })
  res.json(books)
})

routes.get('/api/books', (req, res) => {
  res.json(books);
});
routes.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({ id: bookID }) => bookID === id);

  if (book?.id) res.json(book);
  else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

routes.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({ id: bookID }) => bookID === id);
  const editBook = { id, ...req.body };

  if (book.id) {
    books = [...books, editBook];
    res.json(editBook);
  }
  else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

routes.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({ id: bookID }) => bookID === id);

  if (book.id) {
    books = books.filter(({ id: bookID }) => bookID !== id);
    res.json('ok');
  } else {
    res.status(503);
    res.json('503 | книга не удалена');
  }
})

module.exports = routes;