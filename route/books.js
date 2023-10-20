const express = require("express");
const {
  getBooks,
  getBooksById,
  getABook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/book");
const router = express.Router();

router.param("bookID", getBooksById);
router.get("/books", getBooks);
router.get("/books/:bookID", getABook);
router.post("/books/create", createBook);
router.put("/books/update/:bookID", updateBook);
router.delete("/books/delete/:bookID", deleteBook);

module.exports = router;
