import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const chefe = JSON.parse(localStorage.getItem('chefe'))

const initialState = {
  chefe: chefe ? chefe : null,
  allCefes: null,
  oneChefe: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Register new Chefe
export const register = createAsyncThunk(
  'auth/register',
  async (chefe, thunkAPI) => {
    try {
      return await authService.register(chefe)
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

//Login Chefe
export const login = createAsyncThunk('auth/login', async (chefe, thunkAPI) => {
  try {
    return await authService.login(chefe)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Logout chefe
export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

//Get all Chefes
export const getAllChefes = createAsyncThunk(
  'auth/getAllChefes',
  async (_, thunkAPI) => {
    try {
      return await authService.getAllChefes()
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
//Get one single Chefe
export const getChefe = createAsyncThunk(
  'auth/getChefe',
  async (_, thunkAPI) => {
    try {
      return await authService.getChefe()
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chefe = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.chefe = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chefe = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.chefe = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.chefe = null
      })
      .addCase(getAllChefes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllChefes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allCefes = action.payload
      })
      .addCase(getAllChefes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.allCefes = null
      })
      .addCase(getChefe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getChefe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.oneChefe = action.payload
      })
      .addCase(getChefe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.oneChefe = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
