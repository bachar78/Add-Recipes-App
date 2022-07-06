const express = require('express')
const router = express.Router()
const { protect, Chefe } = require('../middleware/authMiddleware.js')
const reviewRouter = require('./reviewRoutes.js')

//Re-route into review router
router.use('/:id/reviews', reviewRouter)

const {
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getChefeRecipes,
  getRecipesHome,
  getSearchRecipes,
} = require('../controllers/recipeControloer.js')
const { addToFavourites } = require('../controllers/userController')

router.route('/search').get(getSearchRecipes)
router.route('/home').get(getRecipesHome)
router.route('/').post(protect, createRecipe).get(getCategoryRecipes)
router
  .route('/:id')
  .get(protect, getRecipe)
  .delete(protect, deleteRecipe)
  .put(protect, updateRecipe)
router.route('/chefe/:chefeId').get(getChefeRecipes)
router.route('/:recipeId/addFoavourite').get(protect, addToFavourites)

module.exports = router
