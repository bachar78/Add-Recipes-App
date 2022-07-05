import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import { useSelector } from 'react-redux'

const ChefeRoute = () => {
  const { chefe } = useSelector((state) => state.auth)

  return chefe.isChefe ? <Outlet /> : <Navigate to='/' />
}

export default ChefeRoute
