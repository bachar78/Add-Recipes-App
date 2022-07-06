import { getChefeRecipes } from '../../features/recipes/recipeSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'

function ChefeRecipe() {
  const dispatch = useDispatch()
  const { chefId } = useParams()
  const { chefeRecipes, isLoading, isError } = useSelector(
    (state) => state.recipes
  )

  useEffect(() => {
    dispatch(getChefeRecipes(chefId))
  }, [chefId])
  console.log(chefeRecipes)
  if (isLoading) {
    return <Spinner />
  }
  return <div>Chefe</div>
}

export default ChefeRecipe
