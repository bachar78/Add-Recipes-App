import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { reset, login } from '../../../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../components/spinner/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const { chefe, isLoading, isError, message } = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // Redirect when logged in
    if (chefe) {
      navigate('/')
    }
  }, [isError, message, navigate, chefe])

  const { email, password } = formData
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const chefeData = {
      email,
      password,
    }
    dispatch(login(chefeData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='flex-column login'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <form onSubmit={onSubmit}>
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
          <button type='submit'>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default Login
