export interface User {
  id: string
  firstName: string
  lastName: string
  color: UserColor
}

export interface CrewMember extends User {
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
  | 'black'
  | 'turquoise'
