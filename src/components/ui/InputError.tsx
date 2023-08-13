import { FC } from "react"

interface InputErrorProps {
  message: string
}

export const InputError: FC<InputErrorProps> = ({ message }) => (
  <p className="mt-2 w-full rounded-md px-2 text-sm text-red-500">{message}</p>
)
