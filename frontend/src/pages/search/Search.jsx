import './search.scss'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { reset, getSearchRecipes } from '../../features/recipes/recipeSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/spinner/Spinner'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Search() {
  const { search } = useParams()
  const dispatch = useDispatch()
  const { searchRecipes, isLoading, isError } = useSelector(
    (state) => state.recipes
  )

  useEffect(() => {
    dispatch(getSearchRecipes(search))
    return () => {
      dispatch(reset())
    }
  }, [search])

  if (isLoading) {
    return <Spinner />
  }
  return (
    searchRecipes && (
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='grid'
      >
        {searchRecipes.map((recipe) => (
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

export default Search
