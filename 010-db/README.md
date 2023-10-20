```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: String
}, { timestamps: true });

const Book = mongoose.model('Post', bookSchema);
module.exports = Book;

```

```javascript
import { BookModel } from '@/models/bookModel';

  // Создание книги
  const createBook = async book => {
    try {
      const newBook = new BookModel(book);
      await newBook.save();
    } catch (error) {
      console.log(e);
    }
  }
  
  // добавление нескольких книг
  const createBook = async books => {
    if (books.lang < 2) {
      console.log('Min 2 book');
      return;
    }
    try {
      const newBook = db.books.insertMany(books);
      await newBook.save();
    } catch (error) {
      console.log(e);
    }
  }

  // обновление книги
  const updateBook = async (id, book) => {
    try {
      const book = await Post.findByIdAndUpdate(id, { ...book });
      await book.save();
    } catch (e) {
      console.log(e);
    }
  }

  // получение книги по id
  const getBook = async id => {
    try {
      return await BookModel.findById(id);
    } catch (error) {
      console.log(e);
    }
  }

// получение книги по title
  const findBookByTitle = async title => {
    try {
      return await BookModel.find({}).select({ "title": title });;
    } catch (error) {
      console.log(e);
    }
  }

  // получение всех книг
  const getBooks = async () => {
    try {
      return await BookModel.find().sort({ createdAt: -1 });
    } catch (error) {
      console.log(e);
    }
  }

  // удаление книги
  const deleteBook = async id => {
    try {
      await BookModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(e);
    }
  }
```