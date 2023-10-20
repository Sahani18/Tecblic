const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    publication: {
      type: String,
      required: false,
      trim: true,
      maxlength: 32,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    isbn: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Books", bookSchema);
