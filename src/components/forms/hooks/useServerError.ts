import { useEffect, useState } from "react"
import { UseFormWatch } from "react-hook-form"
import { IFormValues } from "../types"

export const useServerError = (watch: UseFormWatch<IFormValues>) => {
  const [serverError, setServerError] = useState("")

  useEffect(() => {
    const subscription = watch(() => setServerError(""))

    return () => subscription.unsubscribe()
  }, [watch])

  return { serverError, setServerError }
}
