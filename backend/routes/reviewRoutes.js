const express = require('express')
const router = express.Router({ mergeParams: true })
const { EditReview, protect } = require('../middleware/authMiddleware')
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

router.route('/').get(protect, getReviews).post(protect, createReview)
router
  .route('/reviewId')
  .put(protect, EditReview, updateReview)
  .delete(protect, EditReview, deleteReview)

module.exports = router
