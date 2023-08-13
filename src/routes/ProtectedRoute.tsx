import { FC, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router"
import { Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  isAllowed: boolean
  redirectPath?: string
  children?: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/login",
  children = null,
}) => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isAllowed) {
      navigate(redirectPath)

      return
    }
  }, [])

  return children ? children : <Outlet />
}
