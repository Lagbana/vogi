// Create a context API for Authentication
import { createContext, useContext } from 'react'

export const AuthContext = createContext()
// Export the context
export function useAuth () {
  return useContext(AuthContext)
}
