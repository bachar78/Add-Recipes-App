const mongoose = require('mongoose')

const recibeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['vegetarian', 'salad', 'desert', 'surprise basket'],
      required: [true, 'Please choose the basket name'],
    },
    ingredients: [String],
    summary: { type: String, required: true },
    instructions: { type: String, required: true },
    image: { type: String },
    number_serving: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Recipe', recibeSchema)
