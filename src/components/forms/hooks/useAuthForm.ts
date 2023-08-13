import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { IFormValues } from "../types"

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is a required field")
      .min(3)
      .max(32),
    email: yup
      .string()
      .required("Email is a required field")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Ivalid email format")
      .min(3)
      .max(32),
  })
  .required()

export const useAuthForm = () => {
  return useForm<IFormValues>({
    resolver: yupResolver(schema),
  })
}
