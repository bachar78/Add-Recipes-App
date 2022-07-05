import './search.scss'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { reset, getSearchRecipes } from '../../features/recipes/recipeSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/spinner/Spinner'

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
      <div className='grid'>
        {searchRecipes.map((recipe) => (
          <div className='card-filter' key={recipe._id}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </div>
        ))}
      </div>
    )
  )
}

export default Search
