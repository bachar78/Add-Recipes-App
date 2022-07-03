import axios from 'axios'
const API_URL = '/api/users'

//Register user

const register = async (chefeData) => {
  const { data } = await axios.post(API_URL, chefeData)
  if (data) {
    localStorage.setItem('chefe', JSON.stringify(data))
  }
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
const GetAllChefes = async () => {
  const { data } = axios.get(`${API_URL}/chefes`)
  return data
}

//Get chefe
const getChefe = async (id) => {
  const { data } = axios.get(`${API_URL}/chefes/${id}`)
  return data
}

const authService = {
  GetAllChefes,
  getChefe,
  register,
  logout,
  login,
}

export default authService
