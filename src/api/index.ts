import axios from "axios"
import { IReponse } from "~/types/IReponse"

export const API_URL = "http://localhost:3333/api"

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    console.log(error)

    if (error.response.status === 401 && !error.config._isRetry) {
      console.log("here")
      originalRequest._isRetry = true

      try {
        const { data } = await axios.get<IReponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        })

        localStorage.setItem("accessToken", data.accessToken)

        return $api.request(originalRequest)
      } catch (error) {
        console.log("Not authorized")
      }
    }
  },
)
