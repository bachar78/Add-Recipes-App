import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import { useSelector } from 'react-redux' 



const ChefeRoute = () => {
  const { chefe, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return <Spinner />
  }
  return chefe.isChefe ? <Outlet /> : <Navigate to='/' />
}

export default ChefeRoute