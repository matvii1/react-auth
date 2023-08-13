import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { cn } from "~/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger: "bg-red-500 text-white hover:bg-red-400",
        blue: "bg-blue-600 hover:bg-blue-500 text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  text: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, loading = false, text, size, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "cursor-not-allowed bg-blue-200 hover:bg-blue-200",
        )}
        ref={ref}
        {...props}
      >
        {loading ? (
          <span className="animate-spin">
            <AiOutlineLoading3Quarters />
          </span>
        ) : (
          <span>{text}</span>
        )}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
