import React from 'react';
import { Box, Typography, Button, Grid, Chip, Rating, Divider } from '@mui/material';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from '../../redux/features/books/BooksApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import Recommened from '../home/Recommened';
import ReviewBook from './ReviewBook';
import Related from './RelatedBook';

const SingleBook = () => {
    const { id } = useParams(); // Extract book ID from route
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id); // Fetch book details

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // Display loading state
    if (isLoading) return <Typography variant="h6">Loading...</Typography>;

    // Handle errors
    if (isError || !book) {
        return (
            <Typography variant="h6" color="error">
                Error: Unable to fetch book details. Please try again later.
            </Typography>
        );
    }

    // Ensure book reviews exist (fallback to empty array if undefined)
    const bookWithReviews = { ...book, reviews: book.reviews || [] };

    return (
        <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 3 }}>
            <Grid container spacing={3}>
                {/* Book Cover Image */}
                <Grid item xs={12} md={4}>
                    <Box
                        component="img"
                        src={book?.coverImage || '/placeholder-image.jpg'}
                        alt={book?.title || 'Book cover'}
                        sx={{
                            width: '100%',
                            borderRadius: 2,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Grid>

                {/* Book Details */}
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            padding: 3,
                            backgroundColor: '#f9f9f9',
                            borderRadius: 2,
                            boxShadow: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                {book?.title || 'Untitled Book'}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <Typography variant="h5" sx={{ marginRight: 1 }}>
                                    {book?.averageRating || 'N/A'}
                                </Typography>
                                <Rating value={book?.averageRating || 0} readOnly precision={0.5} />

                            </Box>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ marginBottom: 2 }}
                            >
                                <strong>Author:</strong> {book?.author || 'Unknown Author'}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                <strong>Published:</strong>{' '}
                                {book?.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}
                            </Typography>
                            <Chip
                                label={book?.category || 'Uncategorized'}
                                color="primary"
                                sx={{ marginBottom: 2 }}
                            />
                            <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                                <Rating
                                    name="read-only"
                                    value={book?.rating || 0}
                                    precision={0.1}
                                    readOnly
                                    size="medium"
                                />
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    {book?.rating ? book.rating.toFixed(1) : 'No Ratings'}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                {book?.description || 'No description available.'}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddToCart(book)}
                            startIcon={<FiShoppingCart />}
                            sx={{
                                alignSelf: 'flex-end',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                marginTop: 'auto',
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Related />
            <Divider sx={{ marginY: 4 }} />
            {book && <ReviewBook book={bookWithReviews} />}
            <Divider sx={{ marginY: 4 }} />

        </Box>
    );
};

export default SingleBook;
