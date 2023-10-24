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
  description: String,
  favorite: String,
  fileCover: String,
  fileName: String,
  fileBook: String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);