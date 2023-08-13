import { FC } from "react"
import Loader from "./components/ui/Loader"
import { useGetUser } from "./hooks"
import { Routing } from "./routes"

const App: FC = () => {
  const { loading } = useGetUser()

  return (
    <div className="flex min-h-screen items-center justify-center">
      {loading ? (
        <Loader className="animate-spin text-2xl text-blue-800" />
      ) : (
        <Routing />
      )}
    </div>
  )
}

export default App
