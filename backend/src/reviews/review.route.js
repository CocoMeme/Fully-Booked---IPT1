// src/reviews/review.route.js
const express = require('express');
const { submitReview, getReviews, updateReview, deleteReview} = require('./review.controller');  // Import the controller functions
const router = express.Router();
const Order = require('../orders/order.model'); // Import the Order model

// Endpoint to check if a user has purchased the book
router.get('/validate-purchase/:bookId/:email', async (req, res) => {
    const { bookId, email } = req.params;
  
    try {
      // Ensure both bookId and email are provided
      if (!bookId || !email) {
        return res.status(400).json({ canReview: false, message: 'Invalid parameters.' });
      }
  
      // Find an order with matching email and productIds including bookId
      const userOrder = await Order.findOne({
        email: email,
        productIds: bookId, // Check if productIds includes the bookId
        // status: { $ne: 'Cancelled' }, // Optional: exclude cancelled orders
      });
  
      if (userOrder) {
        return res.status(200).json({ canReview: true });
      } else {
        return res.status(200).json({ canReview: false });
      }
    } catch (error) {
      console.error('Error validating purchase:', error.message);
      return res.status(500).json({ canReview: false, message: 'Server error.' });
    }
  });

router.post('/:bookId', submitReview);
router.get('/:bookId', getReviews);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);

module.exports = router;
