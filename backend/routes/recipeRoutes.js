const express = require('express')
const router = express.Router()
const { protect, Chefe } = '../middleware/authMiddleware.js'
const reviewRouter = require('./reviewRoutes.js')

//Re-route into review router
router.use('/:id/reviews', reviewRouter)

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getChefeRecipes,
} = require('../controllers/recipeControloer.js')

router.route('/').post(protect, createRecipe).get(getAllRecipes)
router
  .route('/:id')
  .get(protect, getRecipe)
  .delete(protect, Chefe, deleteRecipe)
  .put(protect, Chefe, updateRecipe)
router.route('/:chefeId').get(protect, getChefeRecipes)

module.exports = router
