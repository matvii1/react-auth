import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { authService } from "~/services"
import { useAppDispatch } from "~/store/hooks"
import { setIsAuth, setUser } from "~/store/slices/user"

export function useGetUser() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetch() {
      try {
        const data = await authService.checkAuth()

        localStorage.setItem("accessToken", data.accessToken)
        dispatch(setIsAuth(true))
        dispatch(setUser(data.userDto))
      } catch (error) {
        dispatch(setIsAuth(false))
        dispatch(setUser(null))

        if (error instanceof AxiosError) {
          console.log(error.response?.data?.message)
        }
      } finally {
        setLoading(false)
      }
    }

    if (localStorage.getItem("accessToken")) {
      console.log("fetching")

      fetch()
    } else {
      setLoading(false)
      dispatch(setIsAuth(false))
      dispatch(setUser(null))
    }
  }, [dispatch])

  return { loading }
}
