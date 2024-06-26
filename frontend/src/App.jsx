import React, { useState, useEffect } from 'react';
import BookForm from './components/BookRegister';
import { AddBook, UpdateBook, AllBooks, UniqueBook, RemoveBook} from './apiServices/api';
import { Container, Grid, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await AddBook();
    setBooks(response.data.data);
  };

  const handleRegister = async (bookData) => {
    await AddBook(bookData);
    fetchBooks();
  };

  const handleUpdate = async (bookData) => {
    await UpdateBook(selectedBook._id, bookData);
    fetchBooks();
    setSelectedBook(null);
  };

  const handleDelete = async (id) => {
    await RemoveBook(id);
    fetchBooks();
  };

  const handleEdit = async (id) => {
    const response = await AllBooks(id);
    setSelectedBook(response.data.data);
  };

  const handleViewProfile = async (id) => {
    const response = await UniqueBook(id);
    setSelectedBook(response.data.data);
    setProfileDialogOpen(true);
  };

  const handleCloseProfileDialog = () => {
    setProfileDialogOpen(false);
    setSelectedBook(null);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BookForm book={selectedBook} onSubmit={selectedBook ? handleUpdate : handleRegister} />
        </Grid>
        <Grid item xs={12}>
          <List>
            {books.map((book) => (
              <ListItem key={book._id} secondaryAction={
                <>
                  <Button onClick={() => handleViewProfile(book._id)}>View Book Details</Button>
                  <Button onClick={() => handleEdit(book._id)}>Edit Book Details</Button>
                  <Button onClick={() => handleDelete(book._id)}>Remove Book</Button>
                </>
              }>
                <ListItemText primary={`${book.bookName} by ${book.author}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Dialog open={profileDialogOpen} onClose={handleCloseProfileDialog}>
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent>
          {selectedBook && (
            <DialogContentText>
              <strong>Book ID:</strong> {selectedBook.bookId}<br />
              <strong>Book Name:</strong> {selectedBook.bookName}<br />
              <strong>Student Name:</strong> {selectedBook.studentName}<br />
              <strong>Contact Number:</strong> {selectedBook.contactNumber}<br />
              <strong>Author:</strong> {selectedBook.author}<br />
              <strong>Issue Date:</strong> {selectedBook.issueDate}<br />
              <strong>Return Date:</strong> {selectedBook.returnDate}<br />
              <strong>In Charge:</strong> {selectedBook.inCharge}<br />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
