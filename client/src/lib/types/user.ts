export interface User {
  id: string
  firstName: string
  lastName: string
  color: string
}

export interface CrewMember extends User {
  type: 'Crew' | 'Admin' | 'Owner'
}
