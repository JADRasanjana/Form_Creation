import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    authour: {
      type: String,
      required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    inCharge: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
