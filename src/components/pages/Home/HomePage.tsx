import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { useNavigate } from "react-router"
import { Button } from "~/components/ui"
import Loader from "~/components/ui/Loader"
import { authService, userService } from "~/services"
import { useAppDispatch } from "~/store/hooks"
import { setIsAuth, setUser, useSelectUser } from "~/store/slices/user"
import { IUser } from "~/types/IUser"

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userInfo = useSelectUser()

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
      <div>
        {userInfo.user?.isActivated
          ? "User is activated"
          : "Activate your account"}
      </div>
      <div className="flex gap-2">
        <Button variant="danger" text="Sign out" onClick={handleLogout} />
        <Button variant="blue" text="Get Users" onClick={handleGetUsers} />
      </div>

      {isFetching && <Loader className="mt-4 text-center" />}
      {!!error && !data && <p>Error while loading users</p>}

      {typeof data === "string" && <p>{data}</p>}

      {!!data && !(typeof data === "string") && !isFetching && (
        <ul>
          <li>
            {data.map((user: IUser) => (
              <div key={user.email} className="flex items-center gap-6 p-4">
                <span
                  className={`h-5 w-5 rounded-full ${
                    user.isActivated ? "bg-green-600" : "bg-red-600"
                  }`}
                ></span>
                {user.email}
              </div>
            ))}
          </li>
        </ul>
      )}
    </div>
  )
}

export default HomePage
