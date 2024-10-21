const mongoose = require('mongoose');

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Adventure', 'Fiction', 'Business', 'Action', 'Comedy', 'Drama'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    enum: ['New', 'Sale', 'Hot', 'None'],
    default: 'None',
    required: true,
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function() {
        // Only allow discountPrice to have a value if the tag is 'Sale'
        return this.tag === 'Sale' ? this.discountPrice != null : this.discountPrice == null;
      },
      message: props => `Discount price is only allowed when the tag is 'Sale'.`
    },
  },
  coverImage: {
    type: String, 
    required: true,
  }
}, { timestamps: true });


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
