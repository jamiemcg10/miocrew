import { createContext } from 'react'
import { User } from '../../types'

interface UserContextType {
  user: User | null
  setUser: Function
}

export const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} })
