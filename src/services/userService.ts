import { AxiosError } from "axios"
import { $api } from "~/api"
import { IUser } from "~/types/IUser"

export default class UserService {
  static async getAll() {
    try {
      const { data } = await $api.get<IUser[]>("/users")

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message
      }
    }
  }
}
