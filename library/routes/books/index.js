const express = require('express');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const { v4: uuid } = require("uuid");
const router = express.Router();
const fileMulter = require('../../middleware/books/upload');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let books = require("./booksStorage");

// список всех книг
router.get('/api/books', (req, res) => {
  res.render('books/index', { title: 'Books', books });
});

// создание книги
router.post('/api/books/create', urlencodedParser,(req, res) => {
  books.push({id: uuid(), ...req.body });
  res.status(201);
  res.redirect('/api/books');
})

// форма создания книги
router.get('/api/books/create', (req, res) => {
  res.render('books/create', { title: 'Create', book: {} });
})

// получение книги
router.get('/api/books/detailed/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);

  if (book?.id) {
    const { data: { count: counter } } = await axios.post(`http://counter:3001/counter/${id}/incr`);
    res.render('books/detailed', {title: 'Detailed', book: { ...book, counter } });
  }
  else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

router.get('/api/books/update/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);

  if (book.id) {
    res.status(201);
    res.render('books/update', { title: 'Update', book });
  } else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
})
// редактирование книги
router.post('/api/books/update/:id', urlencodedParser, (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(({id: bookID}) => bookID === id);
  console.log(req.body)
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.status(201);
    res.redirect('/api/books');
  } else {
    res.status(404)
    res.json('404 - книга не найдена')
  }
});

// удаление книги
router.post('/api/books/delete/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);

  if (book.id) {
    books = books.filter(({id: bookID}) => bookID !== id);
    res.status(201);
    res.redirect('/api/books');
  } else {
    res.status(503);
    res.json('503 | книга не удалена');
  }
});

// загрузка файла
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

// скачивание файла
router.get('/api/books/:id/download', (req, res) => {
  const { id } = req.params;
  const book = books.find(({id: bookID}) => bookID === id);
  if (!book.id) res.status(404).json('404 - книга не найдена');
  res.download(`${book.fileBook}`, `${book.fileName}`, err=> {
    if (err) res.status(503).json(`Ошибка сервера - ${err}`);
  });
});

module.exports = router;