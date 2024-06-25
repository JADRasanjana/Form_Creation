const express = require("express");
const bookRouter = require("../src/routes/bookRoutes");
const app = express();


//middleware
app.use(express.json());

//routes
app.use("/api/v1/book", bookRouter);

module.exports = app;