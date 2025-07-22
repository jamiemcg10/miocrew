import { User } from '../types'

export function getInitials(user: User | undefined) {
  return !user ? '' : `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
}
