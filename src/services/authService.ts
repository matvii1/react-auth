import axios, { AxiosError } from "axios"
import { $api, API_URL } from "~/api"
import { IReponse } from "~/types/IReponse"

export default class AuthService {
  static async login({ email, password }: { email: string; password: string }) {
    try {
      const { data } = await $api.post<IReponse>("/login", { email, password })

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error?.response.data?.message
        }
      }
    }
  }

  static async register({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    try {
      const { data } = await $api.post<IReponse>("/register", {
        email,
        password,
      })

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error?.response.data?.message
        }
      }
    }
  }

  static async checkAuth() {
    const { data } = await axios.get<IReponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    })

    return data
  }

  static async logout() {
    try {
      await $api.post("/logout")

      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message)
      }
      return null
    }
  }
}
