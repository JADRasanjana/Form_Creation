import express from 'express';

import { 
    createBook, 
    getBook, 
    getBookById, 
    updateBook, 
    deleteBook } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.route("/").post(createBook);
bookRouter.route("/").get(getBook);
bookRouter.route("/:id").get(getBookById);
bookRouter.route("/:id").put(updateBook);
bookRouter.route("/:id").delete(deleteBook);

export default bookRouter;