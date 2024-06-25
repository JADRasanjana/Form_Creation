const Book = require("../models/bookModel");

//@desc create Product
//@route POST /api/v1/product
//@access Public
exports.createBook = async (req, res) => {
  try {
    const { productId, name, description, category, price } = req.body;

    //Check already exists
    const bookExists = await Product.findOne({ productId });

    //if found
    if (bookExists) {
      throw new Error("Book already exists");
    }

    //Create product
    const newBook = await Book.create({
      productId,
      name,
      description,
      category,
      price,
    });

    res.status(201).json({
      status: "success",
      message:"Book details entered successfully",
      data: newBook,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//@desc Get all Products
//@route GET /api/v1/product
//@access Public
exports.getBook = async (req, res) => {
  try {
    const book = await Book.find();

    res.status(201).json({
      status: "success",
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//@desc Get one Product by id
//@route GET /api/v1/product/:id
//@access Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(201).json({
      status: "success",
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc Update Product
//@route PUT /api/v1/product/:id
//@access Public
exports.updateBook = async (req, res) => {
  try {
    const { productId, name, description, category, price } = req.body;

    //check already exists
    const productExist = await Product.findOne({ productId });
    if (productExist) {
      throw new Error("Product already exist");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productId,
        name,
        description,
        category,
        price,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc Delete Product
//@route DELETE /api/v1/product/:id
//@access Public
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
