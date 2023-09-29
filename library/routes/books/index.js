const express = require('express');
const { v4: uuid } = require("uuid");
const router = express.Router();
const fileMulter = require('../../middleware/books/upload');

let books = require("./booksStorage");

router.post('/api/user/login', (req, res) => {
  const data = {id: 1, mail: "test@mail.ru"};
  res.status(201);
  res.json(data);
});
router.post('/api/books', (req, res) => {
  books.push({id: uuid(), ...req.body})
  res.json(books)
})

router.get('/api/books', (req, res) => {
  res.json(books);
});
router.get('/api/books/:id', (req, res) => {
  const {id} = req.params;
  const book = books.find(({id: bookID}) => bookID === id);

  if (book?.id) res.json(book);
  else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

router.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);
  const editBook = {id, ...req.body};

  if (book.id) {
    books = [...books, editBook];
    res.json(editBook);
  } else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

router.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);

  if (book.id) {
    books = books.filter(({id: bookID}) => bookID !== id);
    res.json('ok');
  } else {
    res.status(503);
    res.json('503 | книга не удалена');
  }
});

router.post('/api/books/:id/upload', fileMulter.single('book'), (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(({id: bookID}) => bookID === id);

  if (req.file && bookIndex !== -1) {
    const { path } = req.file;
    books[bookIndex] = { ...books[bookIndex], fileName: req.file.filename, fileBook: path };

    res.json(books[bookIndex]);
  } else {
    res.status(503)
    res.json('503 - не удалось загрузить файл');
  }
});

router.get('/api/books/:id/download', (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);
  if (!book.id) res.status(404).json('404 - книга не найдена');
  res.download(`${book.fileBook}`, `${book.fileName}`, err=> {
    if (err) res.status(503).json(`Ошибка сервера - ${err}`);
  });
});

module.exports = router;