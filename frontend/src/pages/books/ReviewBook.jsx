import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';

const ReviewBook = ({ book }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);

  // For managing menu and modals
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null); // Review to be updated or deleted
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (book?._id) {
      fetchReviews(book._id);
      validatePurchase();
    }
  }, [book, currentUser]);

  const fetchReviews = async (bookId) => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/reviews/${bookId}`);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error.message);
    }
  };

  const validatePurchase = async () => {
    if (!currentUser?.email || !book?._id) return;

    try {
      const response = await axios.get(
        `${getBaseUrl()}/api/reviews/validate-purchase/${book._id}/${currentUser.email}`
      );
      setCanReview(response.data.canReview);
    } catch (error) {
      console.error('Failed to validate purchase:', error.message);
      setCanReview(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!book?._id) {
      console.error('Book ID is missing. Cannot submit review.');
      alert('Something went wrong. Unable to submit your review.');
      return;
    }

    const email = currentUser?.email || 'Anonymous';

    try {
      await axios.post(`${getBaseUrl()}/api/reviews/${book._id}`, {
        rating,
        comment,
        email,
      });

      fetchReviews(book._id); // Refresh reviews after submission
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error.message);
    }
  };

  const handleMenuClick = (event, review) => {
    setAnchorEl(event.currentTarget);
    setSelectedReview(review);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteReview = async () => {
    if (!selectedReview?._id) return;

    try {
      await axios.delete(`${getBaseUrl()}/api/reviews/${selectedReview._id}`);
      fetchReviews(book._id); // Refresh reviews after deletion
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete review:', error.message);
    }
  };

  const handleUpdateReview = async () => {
    if (!selectedReview?._id) return;

    try {
      await axios.put(`${getBaseUrl()}/api/reviews/${selectedReview._id}`, {
        rating: selectedReview.rating,
        comment: selectedReview.comment,
      });
      fetchReviews(book._id); // Refresh reviews after update
      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error('Failed to update review:', error.message);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1000, margin: 'auto' }}>
      {/* Book Title and Average Rating */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        {book?.title || 'Book Title'}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h5" sx={{ marginRight: 1 }}>
          {book?.averageRating || 'N/A'}
        </Typography>
        <Rating value={book?.averageRating || 0} readOnly precision={0.5} />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          ({reviews.length} reviews)
        </Typography>
      </Box>

      {/* Add a Review Section */}
      <Box component="form" onSubmit={handleSubmitReview} sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Add Your Review
        </Typography>
        {canReview ? (
          <>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}

              precision={0.5}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Write your review"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" type="submit" disabled={!currentUser}>
              Submit Review
            </Button>
          </>
        ) : (
          <Typography color="error" variant="body2">
            Only users who have purchased this book can leave a review.
          </Typography>
        )}
      </Box>

      {/* Display Reviews Section */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          User Reviews
        </Typography>
        {reviews.length === 0 ? (
          <Typography>No reviews yet. Be the first to review this book!</Typography>
        ) : (
          reviews.map((review) => (
            <Box
              key={review._id}
              sx={{
                marginBottom: 3,
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                    {review.email || 'Anonymous'}
                  </Typography>
                  <Rating value={review.rating} readOnly precision={0.5} size="small" />
                </Box>
                {review.email === currentUser?.email && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, review)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#555', marginBottom: 1 }}>
                {review.comment}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Typography variant="caption" sx={{ color: '#888' }}>
                {review.updatedAt
                  ? new Date(review.updatedAt).toLocaleDateString()
                  : 'Date unknown'}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Review Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setIsUpdateDialogOpen(true);
            handleMenuClose();
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleteDialogOpen(true);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {/* Update Review Dialog */}
      <Dialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
      >
        <DialogTitle>Update Review</DialogTitle>
        <DialogContent>
          <Rating
            value={selectedReview?.rating || 0}
            onChange={(e, newValue) =>
              setSelectedReview({ ...selectedReview, rating: newValue })
            }
            precision={0.5}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Update your review"
            multiline
            rows={4}
            value={selectedReview?.comment || ''}
            onChange={(e) =>
              setSelectedReview({ ...selectedReview, comment: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdateReview}
            disabled={!selectedReview?.rating || !selectedReview?.comment}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Review Confirmation */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this review? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteReview}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewBook;
