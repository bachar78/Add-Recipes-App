import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { reset, getAllRecipes } from '../../features/recipes/recipeSlice'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './filterCategory.scss'

const FilterCategory = () => {
  const { Category } = useParams()
  const dispatch = useDispatch()

  const { recipes, isLoading, isError } = useSelector((state) => state.recipes)

  useEffect(() => {
    dispatch(getAllRecipes(Category))
    if (isError) {
    }
    return () => {
      dispatch(reset())
    }
  }, [Category])

  if (isLoading) {
    return <Spinner />
  }
  return (
    recipes && (
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .75 }}
        className='grid'
      >
        {recipes.map((recipe) => (
          <div className='card-filter' key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </div>
        ))}
      </motion.div>
    )
  )
}

export default FilterCategory
