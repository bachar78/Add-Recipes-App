const express = require('express')
const router = express.Router()
const { protect, Chefe } = '../middleware/authMiddleware.js'

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeControloer.js')




module.exports = router
