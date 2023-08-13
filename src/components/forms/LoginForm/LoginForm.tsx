import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  AuthInputGroup,
  FormError,
  FormTitle,
  InputError,
} from "~/components/ui"
import { Button } from "~/components/ui/Button"
import { authService } from "~/services"
import { useAppDispatch } from "~/store/hooks"
import { setIsAuth, setUser } from "~/store/slices/user"
import { useAuthForm, useServerError } from "../hooks"
import { IFormValues } from "../types"

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useAuthForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { serverError, setServerError } = useServerError(watch)

  async function onSubmit(formValues: IFormValues) {
    setLoading(true)
    const data = await authService.login(formValues)

    if (!data) {
      setServerError(data)
      setLoading(false)

      return
    }

    if (typeof data === "string") {
      setServerError(data)
      setLoading(false)

      return
    }

    setLoading(false)
    setServerError("")
    localStorage.setItem("accessToken", data.accessToken)
    dispatch(setIsAuth(true))
    dispatch(setUser(data.userDto))

    navigate("/")
  }

  return (
    <section className="w-full max-w-sm px-4 sm:px-6">
      <FormTitle text="Login" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full flex-col gap-2 px-4 sm:px-0"
      >
        <div className="w-full">
          <AuthInputGroup id="email" {...register("email")} />
          {errors.email?.message && (
            <InputError message={errors.email?.message} />
          )}
        </div>

        <div className="w-full">
          <AuthInputGroup id="password" {...register("password")} />
          {errors.password?.message && (
            <InputError message={errors.password.message} />
          )}
        </div>

        <Button
          loading={loading}
          variant="blue"
          text="Sign in"
          className="mt-5"
          type="submit"
          disabled={loading}
        />
        {serverError && <FormError message={serverError} />}

        <Link
          to="/register"
          className="cursor-pointer self-end text-sm text-blue-900 underline"
        >
          Don't have an account?
        </Link>
      </form>
    </section>
  )
}
