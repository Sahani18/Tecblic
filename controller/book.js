const Books = require("../model/books");

//GET BOOK BASED ON ID PARAMETER
exports.getBooksById = async (req, res, next, id) => {
  try {
    const book = await Books.findById(id).exec();

    if (!book) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    req.profile = book;
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// GET ALL BOOKS

exports.getBooks = async (req, res) => {
  try {
    const { page=1, limit=10, title, author, genre } = req.query;
    let query = {};

    // Apply filters if provided
    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = new RegExp(genre, "i");

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch books with pagination and filters
    const data = await Books.find(query).skip(skip).limit(parseInt(limit));

    // Return response
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET A SPECIFIC BOOK
exports.getABook = (req, res) => {
  // do not send sensitive info to frontend like pwd or unnecessary stuffs by maing it to undefined
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.__v = undefined;
  return res.json(req.profile);
};

// CREATE BOOK
exports.createBook = async (req, res) => {
  try {
    const book = new Books(req.body);
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (error) {
    return res.status(400).json({
      error: "Couldn't save book",
    });
  }
};

// UPDATE BOOK
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    if (!updatedBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.json(updatedBook);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


// DELETE BOOK
exports.deleteBook = async (req, res) => {
  try {
    let book = req.profile._id;
    await Books.findByIdAndDelete(book);
    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Deletion Failed",
    });
  }
};
