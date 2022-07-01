import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import { useSelector } from 'react-redux' 



const PrivateRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth)
 

  if (isLoading) {
    return <Spinner />
  }
  return user.isChefe ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
