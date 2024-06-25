const express = require("express");

const{
    createBook,
    getBook,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.route("/").post(createBook);
bookRouter.route("/").get(getBook);
bookRouter.route("/:id").get(getBookById);
bookRouter.route("/:id").put(updateBook);
bookRouter.route("/:id").delete(deleteBook);

module.exports = bookRouter ;