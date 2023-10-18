const express = require("express");
const { getBooks,getBooksById,getABook,createBook } = require("../controller/book");
const router = express.Router();

router.param("bookID", getBooksById);
router.get("/books", getBooks);
router.get("/books/:bookID", getABook);
router.post("/books/create", createBook);



module.exports = router;