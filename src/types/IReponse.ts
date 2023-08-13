import { IUser } from "./IUser"

export interface IReponse {
  accessToken: string
  refreshToken: string
  userDto: IUser
}
