import { ReactNode, Suspense, lazy } from "react"
import { Navigate, useRoutes } from "react-router"
import Loader from "~/components/ui/Loader"
import { useSelectUser } from "~/store/slices/user"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
)

const LoginPage = Loadable(
  lazy(() => import("../components/pages/LoginPage/LoginPage")),
)

const RegisterPage = Loadable(
  lazy(() => import("../components/pages/RegisterPage/RegisterPage")),
)

const HomePage = Loadable(
  lazy(() => import("../components/pages/Home/HomePage")),
)

const PERMISSIONS = {
  user: "user",
  guest: "guest",
} as const

interface AvailableRoute {
  path: string
  element: ReactNode
  access: (keyof typeof PERMISSIONS)[]
}

export function Routing() {
  const userInfo = useSelectUser()

  const availableRoutes: AvailableRoute[] = [
    {
      path: "/",
      element: <HomePage />,
      access: [PERMISSIONS.user],
    },
    {
      path: "/login",
      element: <LoginPage />,
      access: [PERMISSIONS.guest, PERMISSIONS.user],
    },
    {
      path: "/register",
      element: <RegisterPage />,
      access: [PERMISSIONS.guest, PERMISSIONS.user],
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
      access: [PERMISSIONS.guest],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
      access: [PERMISSIONS.user],
    },
  ]

  const routes = availableRoutes.filter((route) => {
    const userType = userInfo.isAuth ? PERMISSIONS.user : PERMISSIONS.guest

    return route.access.includes(userType)
  })

  return useRoutes(routes)
}
