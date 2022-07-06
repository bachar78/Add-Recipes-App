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
  console.log(recipe)
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
        <div className='info'>
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
              <p>
                <b>Category:</b> {recipe.category}
              </p>
              <p>
                <b>Caloris:</b> {recipe.calories}
              </p>
              <p>
                <b>Number of Serving:</b> {recipe.number_serving} persons
              </p>
              <ul>
                <h1>Way of Preparation</h1>
                {recipe.instructions &&
                  recipe.instructions.map((instruction, index) => (
                    <li className='instruction' key={index}>
                      <h4>Step {index + 1}</h4>
                      <p>{instruction}</p>
                    </li>
                  ))}
              </ul>

              {recipe.author.name && (
                <div className='contact'>
                  <p>
                    <b>Posted by:</b> {recipe.author.name}
                  </p>
                  <p>
                    <b>Contact:</b> {recipe.author.email}
                  </p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'ingridients' && (
            <ul>
              <h4>Ingredients</h4>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
          )}
        </div>
      </div>
    )
  )
}

export default Recipe
