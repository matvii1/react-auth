import { AxiosError } from "axios"
import { $api } from "~/api"
import { IUser } from "~/types/IUser"

export default class UserService {
  static async getAll() {
    try {
      await new Promise((res) => setTimeout(res, 3000))
      const { data } = await $api.get<IUser[]>("/users")

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message)
      }
    }
  }
}
