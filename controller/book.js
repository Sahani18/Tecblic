const Books = require("../model/books");

//GET BOOK BASED ON ID PARAMETER
exports.getBooksById = (req, res, next, id) => {
  Books.findById(id).exec((err, books) => {
    if (err || !books) {
      return res.status(400).json({
        error: "Books not found",
      });
    }
    req.profile = books;
    next();
  });
};

// GET ALL BOOKS

exports.getBooks = (req, res) => {
  Books.find().exec((err, books) => {
    if (err || !books) {
      return res.status(400).json({
        error: "No Books Found",
      });
    }
    return res.status(200).json(books);
  });
};

// GET A SPECIFIC BOOK
exports.getABook = (req, res) => {
  return res.json(req.profile);
};

exports.createBook = (req, res) => {
  const book = new Books(req.body);
  book.save((err, book) => {
    if (err) {
      return res.status(400).json({
        err: "Coudn't save books",
      });
    }
    res.json(book);
  });
};
