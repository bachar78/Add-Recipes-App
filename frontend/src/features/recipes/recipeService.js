import axios from 'axios'
const API_URL = 'http://localhost:5001/api/recipes'

//Create a new recipe
const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(API_URL, recipeData, config)
  return data
}

//Upadate a recipe
const updateRecipe = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${data.recipeId}`,
    data.recipeData,
    config
  )
  return response.data
}

//Get all recipes
const getAllRecipes = async (query) => {
  const { data } = await axios.get(`${API_URL}?category=${query}`)
  return data
}

//Get all recipes
const getSearchRecipes = async (query) => {
  const { data } = await axios.get(`${API_URL}/search?keyword=${query}`)
  return data
}

//Get home recipes
const getHomeRecipes = async () => {
  const { data } = await axios.get(`${API_URL}/home`)
  return data
}

//get a single recipe
const getRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(`${API_URL}/${recipeId}`, config)

  return data
}

//get the recipes for a specific chefe
const getChefeRecipes = async (chefeId) => {
  const { data } = await axios.get(`${API_URL}/chefe/${chefeId}`)
  return data
}

//Add recipe to favourite list
const addToFavourite = async (recipeId) => {
  const { data } = await axios.get(`${API_URL}/${recipeId}/addFoavourite`)
  return data
}

//Delete Recipe
const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(`${API_URL}/${recipeId}`, config)
  return data
}

const recipesService = {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipe,
  getChefeRecipes,
  addToFavourite,
  deleteRecipe,
  getHomeRecipes,
  getSearchRecipes,
}

export default recipesService
