import { useContext } from "react"
import { AuthContext } from "../navigate"

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}