const express = require("express");

const{
    createBook,
    getBook,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.route("/").post(createBook)
            .get(getBook);

bookRouter.route("/:id").get(getBookById)
            .put(updateBook)
            .delete(deleteBook);

module.exports = bookRouter ;