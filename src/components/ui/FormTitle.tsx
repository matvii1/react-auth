import { FC } from "react"
import { cn } from "~/utils"

interface FormTitleProps {
  text: string
  classNames?: string
}

export const FormTitle: FC<FormTitleProps> = ({ text, classNames = "" }) => {
  return (
    <h2
      className={cn("border-b pb-4 text-center text-xl font-bold", classNames)}
    >
      {text}
    </h2>
  )
}
