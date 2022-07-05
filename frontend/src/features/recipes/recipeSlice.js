import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recipesService from './recipeService'

const initialState = {
  recipes: [],
  recipe: {},
  chefeRecipes: [],
  searchRecipes: [],
  recipesHome: [],
  isError: false,
  isSuccess: false,
  chefeAllRecipes: false,
  isFavourite: false,
  isLoading: false,
  isHome: false,
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
      return await recipesService.createRecipe(recipeData, token)
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
      return await recipesService.updateRecipe(data, token)
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

// Get filter Recipes
export const getAllRecipes = createAsyncThunk(
  'recipes/all',
  async (query, thunkAPI) => {
    try {
      return await recipesService.getAllRecipes(query)
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

// Get Search Recipes
export const getSearchRecipes = createAsyncThunk(
  'recipes/search',
  async (query, thunkAPI) => {
    try {
      return await recipesService.getSearchRecipes(query)
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
// Get Recipes Home
export const getRecipesHome = createAsyncThunk(
  'recipesHome/home',
  async (_, thunkAPI) => {
    try {
      return await recipesService.getHomeRecipes()
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

//Get a single Recipe
export const getRecipe = createAsyncThunk(
  'recipe/get',
  async (recipieId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.chefe.token
      return await recipesService.getRecipe(recipieId, token)
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

//Get the recipes of a specific chefe
export const getChefeRecipes = createAsyncThunk(
  'chefeRecipes/get',
  async (chefeId, thunkAPI) => {
    try {
      return await recipesService.getChefeRecipes(chefeId)
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
//Add recipe to a favourite list
export const addToFavourite = createAsyncThunk(
  'addToFavourite/get',
  async (recipeId, thunkAPI) => {
    try {
      return await recipesService.addToFavourite(recipeId)
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

//Delete Recipe
export const deleteRecipe = createAsyncThunk(
  'task/delete',
  async (recipeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.chefe.token
      return await recipesService.deleteRecipe(recipeId, token)
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

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipe = action.payload
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUpdated = true
        state.recipes.map((recipe) =>
          action.payload._id === recipe._id ? action.payload : recipe
        )
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipes = action.payload
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSearchRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSearchRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchRecipes = action.payload
      })
      .addCase(getSearchRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRecipesHome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipesHome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isHome = true
        state.recipesHome = action.payload
      })
      .addCase(getRecipesHome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipe = action.payload
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getChefeRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getChefeRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.chefeAllRecipes = true
        state.chefeRecipes = action.payload
      })
      .addCase(getChefeRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addToFavourite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isFavourite = true
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleted = true
        state.recipes.filter((recipe) => action.payload._id !== recipe._id)
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = recipeSlice.actions

export default recipeSlice.reducer
