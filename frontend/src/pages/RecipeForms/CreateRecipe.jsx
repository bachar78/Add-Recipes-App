import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { GiCook } from 'react-icons/gi'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

function CreateRecipe() {
  const { chefe } = useSelector((state) => state.auth)
  // const { isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.tasks
  // )

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    instructions: '',
    image: '',
    number_serving: 4,
    calories: 0,
  })
  const { title, category, summary, image, number_serving, calories } = formData

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const [inputState, setInputState] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const setImageUrl = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  // if (isLoading) {
  //   return <Spinner />
  // }
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState([''])

  const handleIngredientRemove = (index) => {
    const list = [...ingredients]
    list.splice(index, 1)
    setIngredients(list)
  }

  const handleIngredient = (e, index) => {
    const list = [...ingredients]
    list[index] = e.target.value
    setIngredients(list)
  }
  const handleInstructionRemove = (index) => {
    const list = [...instructions]
    list.splice(index, 1)
    setInstructions(list)
  }

  const handleInstruction = (e, index) => {
    const list = [...instructions]
    list[index] = e.target.value
    setInstructions(list)
  }
  return (
    <div className='flex-column login'>
      <h1>
        <GiCook /> Create Recipe
      </h1>
      <form onSubmit={onSubmit}>
        <div className='flex-column'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onChange}
            autoComplete='off'
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='number_serving'>Number Serving</label>
          <input
            type='number'
            name='number_serving'
            id='number_serving'
            value={number_serving}
            onChange={onChange}
            autoComplete='off'
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='summary'>Summary</label>
          <textarea
            type='text'
            id='summary'
            value={summary}
            onChange={onChange}
            autoComplete='off'
            name='summary'
          />
        </div>
        <div className='recipe__ingredients'>
          <h2>
            {' '}
            Add ingredients{' '}
            <AiOutlinePlusCircle
              onClick={() => setIngredients([...ingredients, ''])}
            />
          </h2>

          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className='flex-column'
              style={{ marginBottom: '2rem' }}
            >
              <label htmlFor='ingredient'>Ingredient {index + 1}</label>
              <input
                type='text'
                id='summary'
                value={ingredient}
                onChange={(e) => handleIngredient(e, index)}
                autoComplete='off'
              />
              {ingredients.length > 1 && (
                <h2>
                  Remove Ingredient{' '}
                  <AiOutlineMinusCircle
                    onClick={() => {
                      handleIngredientRemove(index)
                    }}
                  />
                </h2>
              )}
            </div>
          ))}
        </div>
        <div className='recipe__ingredients'>
          <h2>
            {' '}
            Add Steps (Instructions){' '}
            <AiOutlinePlusCircle
              onClick={() => setInstructions([...instructions, ''])}
            />
          </h2>

          {instructions.map((instruction, index) => (
            <div
              key={index}
              className='flex-column'
              style={{ marginBottom: '2rem' }}
            >
              <label htmlFor='instruction'>Step {index + 1}</label>
              <input
                type='text'
                id='summary'
                value={instruction}
                onChange={(e) => handleInstruction(e, index)}
                autoComplete='off'
              />
              {instructions.length > 1 && (
                <h2>
                  Remove Instruction{' '}
                  <AiOutlineMinusCircle
                    onClick={() => {
                      handleInstructionRemove(index)
                    }}
                  />
                </h2>
              )}
            </div>
          ))}
        </div>
        <div className='flex-column'>
          <label htmlFor='number_serving'>Calories</label>
          <input
            type='number'
            id='calories'
            value={calories}
            onChange={onChange}
            autoComplete='off'
            name='calories'
          />
        </div>
        <div className='select' style={{ width: '40%' }}>
          <label htmlFor='category'>Category</label>
          <select name='category' id='category' onChange={onChange}>
            <option value='vegetarian'>Select One</option>
            <option value='vegetarian'>Vegetarian</option>
            <option value='salad'>Salad</option>
            <option value='desert'>Desert</option>
            <option value='mainCourse'>Main Course</option>
          </select>
        </div>
        <div
          className='flex-column'
          style={{ border: '2px solid black', padding: '1rem' }}
        >
          <label htmlFor='image'>Insert the Image of the recipe</label>
          <input
            type='file'
            className='form-control'
            id='image'
            name='image'
            value={inputState}
            onChange={setImageUrl}
            placeholder='insert your image'
            autoComplete='off'
          />
        </div>
        {image ? (
          <img src={image} style={{ height: '100px' }} alt='profile-picture' />
        ) : null}
        <div className='flex-column'>
          <button type='submit'>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipe
