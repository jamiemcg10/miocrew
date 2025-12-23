export interface User {
  id: string
  firstName: string
  lastName: string
  color: UserColor
  email: string
}

export interface CrewMember extends User {
  attendeeId: string
  type: 'Crew' | 'Admin' | 'Captain'
}

export type UserColor =
  | 'orangered'
  | 'teal'
  | 'pink'
  | 'navy'
  | 'green'
  | 'red'
  | 'purple'
  | 'dimgrey'
  | 'turquoise'
