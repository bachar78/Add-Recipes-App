import axios from 'axios'
const API_URL = 'http://localhost:5001/api/recipes'

//Get all Reviews
const getReviews = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(`${API_URL}/${recipeId}/reviews`, config)
  return data
}

//Create a Review
const createReview = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    `${API_URL}/${data.recipeId}/reviews`,
    data.reviewData,
    config
  )
  return response.data
}

const updateReview = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${data.recipeId}/reviews/${data.reviewId}`,
    data.reviewData,
    config
  )
  return response.data
}

//Delete a review
const deleteReview = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(
    `${API_URL}/${data.recipeId}/reviews/${data.reviewId}`,
    config
  )
  return response.data
}

const reviewService = { getReviews, createReview, updateReview, deleteReview }

export default reviewService
