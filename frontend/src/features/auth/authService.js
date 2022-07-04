import axios from 'axios'
const API_URL = 'http://localhost:5001/api/users'

//Register user

const register = async (chefeData) => {
  const { data } = await axios.post(API_URL, chefeData)
  console.log(data)
  if (data) {
    localStorage.setItem('chefe', JSON.stringify(data))
  }
  return data
}

//Login user
const login = async (chefeData) => {
  const { data } = await axios.post(`${API_URL}/login`, chefeData)
  if (data) {
    localStorage.setItem('chefe', JSON.stringify(data))
  }
  return data
}

//Logout user
const logout = () => localStorage.removeItem('chefe')

//Get Chefes
const getAllChefes = async () => {
  const { data } = axios.get(`${API_URL}/chefes`)
  return data
}

//Get chefe
const getChefe = async (id) => {
  const { data } = axios.get(`${API_URL}/chefes/${id}`)
  return data
}

const authService = {
  getAllChefes,
  getChefe,
  register,
  logout,
  login,
}

export default authService
