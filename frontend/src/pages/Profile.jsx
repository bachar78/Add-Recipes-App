import { Link } from 'react-router-dom'
import { FaTicketAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from './profile.module.css'

const Profile = () => {
  const { member } = useSelector((state) => state.auth)
  const {isAdmin} = member
  return (
    <div className={styles.heading}>
      <section className={styles.member}>
        <div className={styles['member-image']}>
          <img src={member.image} alt='member' />
        </div>
        <div className={styles['member-details']}>
          <h3>
            <span>Member: </span> {member.name}
          </h3>
          <h3>
            {' '}
            <span>Email: </span> {member.email}
          </h3>
          <h3>
            <span>Position:</span> {member.position}
          </h3>
        </div>
      </section>
      <section className={styles.tasks}>
        <Link to='tasks' className={styles.btn}>
          <FaTicketAlt /> View Tasks
        </Link>
        <Link
          to='new-task'
          className={`${styles.btn} ${styles['btn-reserve']}`}>
          Create Task
        </Link>
      </section>
    </div>
  )
}

export default Profile
