
const express = require('express');
const app = express();
const host= "localhost";
const port = 3000;

const { v4: uuid } = require('uuid');
let books = require('./books');

app.use(express.json());

app.post('/api/user/login', (req, res) => {
  const data = { id: 1, mail: "test@mail.ru" };
  res.status(201);
  res.json(data);
});
app.post('/api/books', (req, res) => {
  books.push({ id: uuid(), ...req.body })
  res.json(books)
})

app.get('/api/books', (req, res) => {
  res.json(books);
});
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({ id: bookID }) => bookID === id);

  if (book?.id) res.json(book);
  else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

app.listen(port, host,() => {
  console.log(`server listening on port ${port}`)
})

