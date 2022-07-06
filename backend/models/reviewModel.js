const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 3,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Review', reviewSchema)
