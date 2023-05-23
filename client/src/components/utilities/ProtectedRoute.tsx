import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// Types
import { RootState } from '../../redux/store'

interface ProtectedRouteProps {
  redirectPath: string
}

const ProtectedRoute = ({ redirectPath }: ProtectedRouteProps) => {
  const validToken = useSelector((state: RootState) => {
    return state.token.access_token
  })

  if (!validToken) {
    toast.error("Looks like there's been an error, please try again.")
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
