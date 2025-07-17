import { User } from '../types'

export function getInitials(user: User | null) {
  return !user ? '' : `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
}
