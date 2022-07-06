import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { reset, getRecipe } from '../../features/recipes/recipeSlice'
import './recipe.scss'

function Recipe() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { recipe, isLoading, isError } = useSelector((state) => state.recipes)
  const [activeTab, setActiveTab] = useState('instructions')
  useEffect(() => {
    dispatch(getRecipe(id))
  }, [id])

  if (isLoading) {
    return <Spinner />
  }
  return (
    recipe && (
      <div className='detail-wrapper'>
        <div className='recipe-image'>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div className='infor'>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`button ${
              activeTab === 'instructions' ? 'active' : ''
            } `}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('ingridients')}
            className={`button ${activeTab === 'ingridients' ? 'active' : ''} `}
          >
            Ingredients
          </button>
          {activeTab === 'instructions' && (
            <div>
              <p>{recipe.summary}</p>
              <h4>Caloris: {recipe.calories}</h4>
              
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default Recipe
