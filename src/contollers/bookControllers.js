const Book = require('../models/book');

exports.createNewBook = (req, res) => {
    // Retrieve new book data from req body
    Book.create({
        ...req.body
    }, (err, newBook) => {
        if (err) {
            return res.status(500).json({message: err});
        }else{
            return res.status(200).json({message: 'New book created', newBook});
        }
    })
    // console.log(req.body);
}

exports.fetchBooks = (req, res) => {
    console.log({user: req.user.role})
    let conditions = {};
    // Check req query for filters
    if (req.query.category){
        conditions.category = req.query.category;
    }
    if (req.query.author){
        conditions.author = req.query.author;
    }
    // if there are filters, use them in Model.find query
    // Fetch all books
    Book.find(conditions, (err, books) => {
        if (err){
            return res.status(500).json({message: err})
        }else{
            return res.status(200).json({books})
        }
    })
};

exports.fetchSingleBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message: err})
        }else if (!book){
            return res.status(404).json({message: "Book not found"})
        }else{
            return res.status(200).json({book})
        }
    })
};


exports.updateSingleBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        // findOneAndUpdate
        title: req.body.title,
        category: req.body.category
    }, (err, book) => {
        if (err) {
            return res.status(500).json({message: err})
        }else if (!book){
            return res.status(404).json({message: "Book not found"})
        }else{
            book.save((err, savedBook) => {
                if (err) {
                    return res.status(400).json({message: err})
                }else{
                    return res.status(200).json({message: "Book updated succesfully"})
                }
            })
        }
    })
};

exports.deleteSingleBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        // findOneAndDelete
        // findOneAndRemove
        // findByIdAndRemove
        if (err) {
            return res.status(500).json({message: err})
        }else if (!book) {
            return res.status(404).json({message: "Book not found"})
        }else{
            return res.status(200).json({message: "Book deleted successfully"})
        }
    })
};