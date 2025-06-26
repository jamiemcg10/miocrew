export interface User {
  id: string
  firstName: string
  lastName: string
  color: string
}

export interface CrewMember extends User {
  type: 'Attendee' | 'Admin' | 'Owner'
}
