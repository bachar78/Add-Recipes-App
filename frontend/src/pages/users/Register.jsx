import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import Spinner from '../components/Spinner'
import styles from './register.module.css'
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
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    // Redirect when registered
    if (user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

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
      toast.error("Password don't much")
    } else {
      const memberData = {
        name,
        email,
        position,
        password,
        image,
      }
      dispatch(register(memberData))
    }
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className={styles.register}>
      <h1>
        <FaUser /> Register
      </h1>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles['form-group']}>
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
            <label htmlFor='name'>Enter your Name</label>
          </div>
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
              placeholder='Enter Password'
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Enter Password</label>
          </div>
          <div className={styles['form-group']}>
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
            <label htmlFor='password'>Confirm your Password</label>
          </div>
          <div className={styles['form-group']}>
            <select name='position' id='position' onChange={onChange}>
              <option value='Front-end' className={styles.options}>
                Choose a Position
              </option>
              <option value='Front-end'>Front-end</option>
              <option value='Backend'>Backend</option>
              <option value='Full-stack'>Full-stack</option>
              <option value='Design'>Design</option>
              <option value='Admin'>Admin</option>
            </select>
          </div>
          <div className={styles['form-group']}>
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
            <label htmlFor='image'>Insert Your Image</label>
          </div>
          {image ? (
            <img
              src={image}
              style={{ height: '100px' }}
              alt='profile-picture'
            />
          ) : null}
          <div className={styles['form-group']}>
            <button className={styles.btn} type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register
