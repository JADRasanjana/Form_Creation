import express from "express"
import bookRouter from './src/routes/bookRoutes.js';
//import { notFound, errorHandler } from './src/middlewares/bookMiddlewares.js';
import connectDB from "./src/dbConnect/connectDB.js";
import { config } from 'dotenv';
import mongoose from "mongoose";
config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
//app.use(bodyParser.json());
app.use(express.json());
// Routes
app.use('/api/v1/books', bookRouter);

// 404 Not Found middleware
//app.use(notFound);

// Global error handler
//app.use(errorHandler);

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Your MongoDB connection is success!!!!!");
})

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`);

        });
    } catch (error) {
        console.log(error);
    }
};

start();



