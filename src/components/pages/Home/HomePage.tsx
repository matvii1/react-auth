import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { useNavigate } from "react-router"
import { Button } from "~/components/ui"
import Loader from "~/components/ui/Loader"
import { authService, userService } from "~/services"
import { useAppDispatch } from "~/store/hooks"
import { setIsAuth, setUser } from "~/store/slices/user"

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data, refetch, error, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    enabled: false,
    initialData: null,
  })

  console.log(data)

  async function handleLogout() {
    const isLoggedout = await authService.logout()

    if (isLoggedout) {
      localStorage.removeItem("accessToken")

      dispatch(setUser(null))
      dispatch(setIsAuth(false))
      navigate("/login")
    } else {
      console.log("error while logging out")
    }
  }

  async function handleGetUsers() {
    refetch()
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button variant="danger" text="Sign out" onClick={handleLogout} />
        <Button variant="blue" text="Get Users" onClick={handleGetUsers} />
      </div>

      {isFetching && <Loader className="mt-4 text-center" />}
      {!!error && <p>Erro while loading users</p>}

      {data && !isFetching && (
        <ul>
          {data.map((user) => (
            <p key={user.email} className="p-4 text-lg">
              {user.email}
            </p>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
