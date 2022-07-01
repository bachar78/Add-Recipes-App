import { useAuthStatus } from '../../hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus()
  if (loading) {
    return <Spinner />
  }
  return loggedIn ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
