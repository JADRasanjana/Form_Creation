const Book = require("../models/bookModel");

//@desc create Book
//@route POST /api/v1/book
//@access Public
exports.createBook = async (req, res) => {
  try {
    const { bookId, bookName, contactNumber, authour, issueDate, returnDate, inCharge } = req.body;

    const bookExists = await Book.findOne({ bookId });

    if (bookExists) {
      throw new Error("Book is already exists");
    }

    //Create Book
    const newBook = await Book.create({
        bookId, 
        bookName, 
        contactNumber, 
        authour, 
        issueDate, 
        returnDate, 
        inCharge
    });

    res.status(201).json({
      status: "success",
      message:"Book details entered successfully!!!!!!!!!",
      data: newBook,
    });
  } catch (err) {
    res.status(500).json({
      status: "Book details not enterd successfully!!!!!!!",
      message: err.message,
    });
  }
};

//@desc Get all Book
//@route GET /api/v1/book
//@access Public
exports.getBook = async (req, res) => {
  try {
    const book = await Book.find();

    res.status(201).json({
      status: "success",
      message: "Book details fetched successfully!!!!!",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: "Book details fetched successfully!!!!!",
      message: err.message,
    });
  }
};

//@desc Get one Book by id
//@route GET /api/v1/book/:id
//@access Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(201).json({
      status: "success",
      message: "Specific Book details fetched successfully!!!!!!",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: "Book details not fetched successfully!!!!!",
      message: error.message,
    });
  }
};

//@desc Update Book
//@route PUT /api/v1/book/:id
//@access Public
exports.updateBook = async (req, res) => {
  try {
    const { bookId, bookName, contactNumber, authour, issueDate, returnDate, inCharge  } = req.body;

    //check already exists
    const bookExist = await Book.findOne({ bookId });
    if (bookExist) {
      throw new Error("Book already exist");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        bookId,
        bookName, 
        contactNumber, 
        authour, 
        issueDate,
        returnDate, 
        inCharge 
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      message: "Book details updated successfully!!!!!!",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      status: "Book details not updated successfully!!!!1",
      message: error.message,
    });
  }
};

//@desc Delete Book
//@route DELETE /api/v1/book/:id
//@access Public
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "Book details deleted successfully!!!!!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Book details not deleted successfully!!!!!",
      message: err.message,
    });
  }
};
