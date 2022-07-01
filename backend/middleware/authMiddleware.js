const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const Recipe = require('../models/recipeModel')
const Review = require('../models/reviewModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1]

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}
const Chefe = async (req, res, next) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id)
  if (recipe.author.toString() === req.user.id) {
    next()
  } else {
    throw new Error('Not Authorized')
  }
}
const EditReview = async (req, res, next) => {
  const { reviewId } = req.params
  const review = await Review.findById(reviewId)
  if (review.author.toString() === req.user.id) {
    next()
  } else {
    throw new Error('Not Authorized')
  }
}
module.exports = { protect, admin, Chefe, EditReview }
