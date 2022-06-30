const Recipe = require('../models/recipeModel.js')
const asyncHandler = require('express-async-handler')
const { cloudinary } = require('../utils/cloudinary.js')

//@des Get all Recipes for the homepage
//@route /api/recipes
//@access Public
const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({})
  if (!recipes) {
    res.status(401)
    throw new Error('Recipes not found')
  }
  res.status(200).json(recipes)
})

//@des Get a single recipe
//@route /api/recipes/:id
//@access Public
const getRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id)
  if (!recipe) {
    res.status(401)
    throw new Error('Recipes not found')
  }
  res.status(200).json(recipe)
})

//@des Create a recipe
//@route /api/recipes
//@access Private
const createRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    ingredients,
    summary,
    instructions,
    number_serving,
    image,
    calories,
  } = req.body

  //validation
  if (
    !title ||
    !category ||
    !ingredients ||
    !summary ||
    !instructions ||
    !number_serving ||
    !calories
  ) {
    res.status(400)
    throw new Error('Please include all required fields')
  }
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    upload_preset: 'add-recipes',
  })
  //create recipe
  const newRecipe = await Recipe.create({
    title,
    category,
    ingredients,
    summary,
    instructions,
    number_serving,
    calories,
    image: uploadedResponse.url,
    author: req.user._id,
  })
  if (!newRecipe) {
    res.status(400)
    throw new Error("Can't create this recipe")
  }
  res.status(200).json(newRecipe)
})

//@des Update a recipe
//@route /api/recipes/:id
//@access Private
const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params
  const recipeUpdate = await Recipe.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  )
  if (!recipeUpdate) {
    res.status(400)
    throw new Error("Recipe can't be updated")
  }
  res.status(200).json(recipeUpdate)
})

//@des delete a recipe
//@route /api/recipes/:id
//@access Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleteRecipe = await Recipe.findByIdAndDelete(id)
  if (!deleteRecipe) {
    res.status(400)
    throw new Error('Recipe can not be deleted')
  }
  res.status(200).json(deleteRecipe)
})

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
