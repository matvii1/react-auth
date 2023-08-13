import { forwardRef } from "react"
import { cn } from "~/utils"

export interface AuthInputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: "email" | "password"
}

const AuthInputGroup = forwardRef<HTMLInputElement, AuthInputGroupProps>(
  ({ className, type, id, ...props }, ref) => {
    return (
      <>
        <label htmlFor={id} className="text-md text-slate-600">
          {id[0].toUpperCase() + id.slice(1)}:
        </label>
        <input
          type={type}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          id={id}
          ref={ref}
          {...props}
        />
      </>
    )
  },
)

AuthInputGroup.displayName = "AuthInputGroup"

export { AuthInputGroup }
