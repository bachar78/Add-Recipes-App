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
const getAllRecipes = async () => {
  const { data } = await axios.get(API_URL)
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
const getChefeRecipes = async () => {
  
}

const recipesService = { createRecipe, updateRecipe, getAllRecipes, getRecipe }

export default recipesService
