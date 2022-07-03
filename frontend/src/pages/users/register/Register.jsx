import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../../components/spinner/Spinner'
import './regiser.scss'
function Register() {
  const [inputState, setInputState] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    password: '',
    password2: '',
    image: '',
  })
  const { name, email, position, password, password2, image } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { chefe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message)
  //   }

  //   // Redirect when registered
  //   if (user) {
  //     navigate('/')
  //   }
  // }, [isError, user, message, navigate])

  const setImageUrl = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }))
    }
  }

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
    } else {
      const memberData = {
        name,
        email,
        position,
        password,
        image,
      }
    }
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='flex-column login'>
      <h1>
        <FaUser /> Register
      </h1>
      <form onSubmit={onSubmit}>
        <div className='flex-column'>
          <label htmlFor='name'>Enter your Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Enter your Name'
            autoComplete='off'
            required
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='email'>Enter your Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter your Email'
            autoComplete='off'
            required
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='password'>Enter Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Enter Password'
            autoComplete='off'
            required
          />
        </div>
        <div className='flex-column'>
          <label htmlFor='password'>Confirm your Password</label>
          <input
            type='password'
            className='form-control'
            id='password2'
            name='password2'
            value={password2}
            onChange={onChange}
            placeholder='Confirm your Password'
            autoComplete='off'
            required
          />
        </div>
        <div className='chefe'>
          <label> Are You Chefe ?</label>
          <input
          style={{width: "10%"}}
            type='checkbox'
            name='isChefe'
            // onChange={(e) =>
            //   setFeatured(e.target.checked ? e.target.value : false)
            // }
            value='true'
          />
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

export default Register
