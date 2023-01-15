const express = require('express');
const router = express.Router();
const BookController = require('../contollers/bookControllers');
const {authenticateUser, checkIfAdmin} = require('../middlewares/authentication')

// POST to /books to create a new book
router.post('/books', authenticateUser, checkIfAdmin, BookController.createNewBook )

// GET to /books to fetch all books
router.get('/books', authenticateUser, BookController.fetchBooks)

// GET to /books/:id to fetch a single book
// router.get('/books/:id', (req, res) => {
//     Book.findOne({_id: req.params.id}, (err, book) => {
//         if (err) {
//             return res.status(500).json({message: err})
//         }else if (!book){
//             return res.status(404).json({message: "Book not found"})
//         }else{
//             return res.status(200).json({book})
//         }
//     })
// })

// OR
router.get('/books/:id', authenticateUser, BookController.fetchSingleBook)

// PUT to /books/:id to update a single book
router.put('/books/:id', authenticateUser, BookController.updateSingleBook)

// DELETE to /books/:id to delete
router.delete('/books/:id', authenticateUser, BookController.deleteSingleBook)

module.exports = router;