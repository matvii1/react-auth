import { FC } from "react"

interface FormErrorProps {
  message: string
}

export const FormError: FC<FormErrorProps> = ({ message }) => (
  <p className="mt-2 w-full rounded-md bg-red-200 px-4 py-2 text-sm text-red-800">
    {message}
  </p>
)
