const express = require('express')
const router = express.Router()
const { protect, Chefe } = require('../middleware/authMiddleware.js')
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
  getRecipesHome,
} = require('../controllers/recipeControloer.js')
const { addToFavourites } = require('../controllers/userController')

router.route('/home').get(getRecipesHome)
router.route('/').post(protect, createRecipe).get(getAllRecipes)
router
  .route('/:id')
  .get(protect, getRecipe)
  .delete(protect, deleteRecipe)
  .put(protect, updateRecipe)
router.route('/:chefeId').get(getChefeRecipes)
router.route('/:recipeId/addFoavourite').get(protect, addToFavourites)


module.exports = router
