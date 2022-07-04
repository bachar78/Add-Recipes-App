import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recipesService from './recipeService'

const initialState = {
  recipes: [],
  recipe: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  isDeleted: false,
  message: '',
}

// Create a new Recipe
export const createRecipe = createAsyncThunk(
  'recipe/create',
  async (recipeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.chefe.token
      // return await recipesService.createRecipe(recipeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Update Recipe
export const updateRecipe = createAsyncThunk(
  'recipe/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.chefe.token
      // return await recipesService.updateRecipe(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)