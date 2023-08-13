import { FC } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { cn } from "~/utils"

interface LoaderProps {
  className?: string
}

const Loader: FC<LoaderProps> = ({ className = "" }) => {
  return (
    <span className={cn("inline-block animate-spin", className)}>
      <AiOutlineLoading3Quarters />
    </span>
  )
}

export default Loader
