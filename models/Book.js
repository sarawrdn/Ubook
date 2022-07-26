const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  price:{
    type : Number
  },
  category :{
    type : String
  },
  type :{
    type : String
  },
  subject :{
    type : String
  },
  description :{
    type : String
  },
  uni :{
    type: String
  },
  status:{
    type: String,
    default: 'Pending'
  },
  seller:{
    type: String
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;