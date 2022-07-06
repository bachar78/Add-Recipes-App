import './NavBar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MdFoodBank } from 'react-icons/md'
import { FaSignInAlt } from 'react-icons/fa'
import { AiOutlineTeam } from 'react-icons/ai'
import { logout, reset } from '../../features/auth/authSlice'
import { GiKnifeFork } from 'react-icons/gi'
import { useSelector, useDispatch } from 'react-redux'

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { chefe } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <div className='nav'>
      <Link to='/' className='nav__logo'>
        <MdFoodBank className='nav__logo-icon' />
        <h1 className='logo'>Add-Recipes</h1>
      </Link>
      <ul className='nav__links'>
        {chefe && chefe.isChefe && (
          <li>
            <Link to='/create' className='nav__links-item'>
              <GiKnifeFork />
              <h2>Add Recipe</h2>
            </Link>
          </li>
        )}
        {chefe ? (
          <>
            <li onClick={onLogout}>
              <Link to='/login' className='nav__links-item'>
                <FaSignInAlt />
                <h2>Logout</h2>
              </Link>
            </li>
            <li className='links-profile'>
              <div className='profile'>
                <img src={chefe.image} alt='user' />
              </div>
              <h5>{chefe.name}</h5>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login' className='nav__links-item'>
                <FaSignInAlt />
                <h2>Login</h2>
              </Link>
            </li>
            <li>
              <Link to='/register' className='nav__links-item'>
                <AiOutlineTeam /> <h2>Register</h2>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default NavBar

