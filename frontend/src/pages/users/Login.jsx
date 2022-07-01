import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import styles from './register.module.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // Redirect when logged in
    if (user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, message, dispatch, navigate, user])

  const { email, password } = formData
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className={styles.register}>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      {/* <p>
          New member? <Link to='/register'>Sign up</Link> here
        </p> */}
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles['form-group']}>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your Email'
              autoComplete='off'
              required
            />
            <label htmlFor='email'>Enter your Email</label>
          </div>
          <div className={styles['form-group']}>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter Your Password'
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Enter Your Password</label>
          </div>
          <div className={styles['form-group']}>
            <button className={styles.btn}>Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
