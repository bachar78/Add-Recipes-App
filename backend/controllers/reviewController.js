const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel.js')
const Recipe = require('../models/recipeModel.js')

//@desc create review
//route POST /api/recipes/:id/reviews
//access Private
const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { review, rating } = req.body
  const recipe = await Recipe.findById(id)
  if (!recipe) {
    res.status(400)
    throw new Error('Recipe not found')
  }
  if (!rating || !review) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }
  const newReview = await Review.create({
    review,
    rating,
    recipe: recipe._id,
    author: req.user._id,
  })
  recipe.reviews.push(newReview._id)
  await recipe.save()

  if (!newReview) {
    res.status(400)
    throw new Error("You can't post a review")
  }
  res.status(200).json(newReview)
})

//@desc Get all reviews
//route Get/api/recipes/:id/reviews
//access Private
const getReviews = asyncHandler(async (req, res) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id)
  if (!recipe) {
    res.status(400)
    throw new Error('Recipe not found')
  }
  const reviews = await Review.find({ recipe: recipe._id }).populate('author')
  if (!reviews) {
    res.status(400)
    throw new Error('No reviews to show')
  }
  res.status(200).json(reviews)
})

//@desc update review
//route PUT/api/recipes/:id/reviews/:reviewId
//access Private
const updateReview = asyncHandler(async (req, res) => {
  const { review, rating } = req.body
  if (!review && !rating) {
    res.status(401)
    throw new Error('You should update at least one field')
  }
  const reviewToUpdate = await Review.findByIdAndUpdate(
    req.params.reviewId,
    { $set: req.body },
    { new: true }
  )
  if (!reviewToUpdate) {
    res.status(400)
    throw new Error('Review not exists')
  }
  res.status(200).json(reviewToUpdate)
})
//@desc delete review
//route DELETE/api/campgrounds/:id/reviews/:reviewId
//access Private
const deleteReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params
  const deletedReview = await Review.findByIdAndDelete(reviewId)
  await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  if (!deletedReview) {
    res.status(400)
    throw new Error('Review can not be deleted')
  }
  res.status(200).json(deletedReview)
})

module.exports = { createReview, getReviews, updateReview, deleteReview }
