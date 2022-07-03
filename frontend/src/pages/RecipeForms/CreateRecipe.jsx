import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { GiCook } from 'react-icons/gi'

function CreateRecipe() {
  const { chefe } = useSelector((state) => state.auth)
  // const { isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.tasks
  // )
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    ingredients: [],
    summary: '',
    instructions: '',
    image: '',
    number_serving: 4,
    calories: 0,
  })
  const {
    title,
    category,
    ingredients,
    summary,
    instructions,
    image,
    number_serving,
    calories,
  } = formData
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
  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //   }
  //   if (isSuccess) {
  //     dispatch(reset())
  //     navigate('/profile/tasks')
  //   }
  //   dispatch(reset())
  // }, [isError, message, isSuccess, dispatch, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    // dispatch(createTask({ task, description, status, deadline }))
  }

  // if (isLoading) {
  //   return <Spinner />
  // }
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
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='instructions'>Instructions</label>
          <textarea
            type='text'
            id='instructions'
            value={instructions}
            onChange={onChange}
            autoComplete='off'
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='number_serving'>Calories</label>
          <input
            type='number'
            id='calories'
            value={calories}
            onChange={onChange}
            autoComplete='off'
          />
        </div>
        <div className='select' style={{width: '40%'}}>
          <label htmlFor='category'>Category</label>
          <select name='category' id='category' onChange={onChange}>
            <option value='vegetarian'>Vegetarian</option>
            <option value='salad'>Salad</option>
            <option value='desert'>Desert</option>
            <option value='finished'>mainCourse</option>
          </select>
        </div>
        <div className='flex-column'>
          <label htmlFor='image'>Insert Your Image</label>
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
