const Recipe = require('../models/recipeModel.js')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { cloudinary } = require('../utils/cloudinary.js')

//@des Get recipes for Home page
//@route Get /api/recipes/home
//@access Public
const getRecipesHome = asyncHandler(async (req, res) => {
  const vegetarian = await Recipe.find({ category: 'vegetarian' })
    .limit(9)
    .select(['title', 'image', 'category'])
    .populate('author', 'name')
  const desert = await Recipe.find({ category: 'desert' })
    .limit(9)
    .select(['title', 'image', 'category'])
    .populate('author', 'name')
  const chefes = await User.find({ isChefe: true })
    .limit(9)
    .select(['name', 'image'])
  res.status(200).json({ vegetarian, desert, chefes })
})

//@des Get all Recipes for the homepage
//@route /api/recipes
//@access Public
const getCategoryRecipes = asyncHandler(async (req, res) => {
  const { category } = req.query
  const recipes = await Recipe.find({ category: category })
  if (!recipes) {
    res.status(401)
    throw new Error('Recipes not found')
  }
  res.status(200).json(recipes)
})

//@des Get Recipes from Search Bar
//@route /api/recipes
//@access Public
const getSearchRecipes = asyncHandler(async (req, res) => {
  const { keyword } = req.query
  const recipes = await Recipe.find({
    title: { $regex: keyword, $options: 'i' },
  })
  if (!recipes) {
    res.status(401)
    throw new Error('Recipes not found')
  }
  res.status(200).json(recipes)
})

//@des Get all Recipes of a specific Chefe
//@route /api/recipes/:chefeId
//@access Public
const getChefeRecipes = asyncHandler(async (req, res) => {
  const { chefeId } = req.params
  const recipes = await Recipe.find({ author: chefeId }).populate('author', [
    'name',
    'email',
    'image',
  ])
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
  const recipe = await Recipe.findById(id).populate('author', ['name', 'email'])
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
    upload_preset: 'task-manager',
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
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getChefeRecipes,
  getRecipesHome,
  getSearchRecipes,
}
