import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const BookForm = ({ book, onSubmit }) => {
  const validate = (values) => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part

    // Book ID validation: 2 uppercase letters followed by 5 digits
    if (!values.bookId) {
      errors.bookId = 'Book ID is required';
    } else if (!/^[A-Z]{2}\d{5}$/.test(values.bookId)) {
      errors.bookId = 'Book ID must be 2 uppercase letters followed by 5 digits';
    }

    // Basic string field validations
    if (!values.bookName) errors.bookName = 'Book Name is required';
    if (!values.studentName) errors.studentName = 'Student Name is required';
    if (!values.author) errors.author = 'Author is required';
    if (!values.inCharge) errors.inCharge = 'In Charge is required';

    // Contact number validation: must be numeric
    if (!values.contactNumber) {
      errors.contactNumber = 'Contact Number is required';
    } else if (!/^\d+$/.test(values.contactNumber)) {
      errors.contactNumber = 'Contact Number must be numeric';
    }

    // Issue Date validation: must be today or in the past
    if (!values.issueDate) {
      errors.issueDate = 'Issue Date is required';
    } else {
      const issueDate = new Date(values.issueDate);
      if (issueDate > today) {
        errors.issueDate = 'Issue Date must be today or in the past';
      }
    }

    // Return Date validation: must be today or in the future
    if (!values.returnDate) {
      errors.returnDate = 'Return Date is required';
    } else {
      const returnDate = new Date(values.returnDate);
      if (returnDate < today) {
        errors.returnDate = 'Return Date must be today or in the future';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: book || {
      bookId: '',
      bookName: '',
      studentName: '',
      contactNumber: '',
      author: '',
      issueDate: '',
      returnDate: '',
      inCharge: '',
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {book ? 'Update Book' : 'Register Book'}
      </Typography>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={3}>
          {Object.keys(formik.initialValues).map((key) => (
            <Grid item xs={12} key={key}>
              <TextField
                fullWidth
                id={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                type={key.includes('Date') ? 'date' : 'text'}
                variant="outlined"
                value={formik.values[key]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[key] && Boolean(formik.errors[key])}
                helperText={formik.touched[key] && formik.errors[key]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
              {book ? 'Update' : 'Register'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BookForm;
