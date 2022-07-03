import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const chefe = JSON.parse(localStorage.getItem('chefe'))

const initialState = {
  chefe: chefe ? chefe : null,
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
export const login = createAsyncThunk(
  'auth/login',
  async (chefe, thunkAPI) => {}
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default authSlice.reducer
