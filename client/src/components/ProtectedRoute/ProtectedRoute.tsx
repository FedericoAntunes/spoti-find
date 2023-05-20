import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'

interface ProtectedRouteProps {
  redirectPath: string
}

const ProtectedRoute = ({ redirectPath }: ProtectedRouteProps) => {
  const validToken = useSelector((state: RootState) => {
    return state.token.access_token
  })

  if (!validToken) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
