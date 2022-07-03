import './NavBar.scss'
import { Link } from 'react-router-dom'
import { MdFoodBank } from 'react-icons/md'
import { FaSignInAlt } from 'react-icons/fa'
import { AiOutlineTeam } from 'react-icons/ai'
function NavBar() {
  return (
    <div className='nav'>
      <Link to='/' className='nav__logo'>
        <MdFoodBank className='nav__logo-icon' />
        <h1>Add-Recipes</h1>
      </Link>
      <ul className='nav__links'>
        {/* <li>
              <button onClick={onLogout} className={styles.logout}>
                {' '}
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li className={styles.user}>
              <div className={styles.image}>
                <img src={member.image} alt='user' />
              </div>
              <h5>{member.name}</h5>
            </li> */}
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
        {/* {member && member.isAdmin ? (
          <li className={styles.admin}>
            <div className={styles.select}>
              <select onClick={onSelect}>
                <option value='admin'>admin</option>
                <option value='members'>members</option>
                <option value='tasks'>Tasks</option>
              </select>
            </div>
          </li>
        ) : null} */}
      </ul>
    </div>
  )
}

export default NavBar
