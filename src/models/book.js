const mongoose = require('mongoose')
// Create Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    description: String,
    category: {
        type: String,
        enum: ["ficiton", "non-fiction", "comics", "others"],
        default: "fiction"
    },
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
    color: String
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;