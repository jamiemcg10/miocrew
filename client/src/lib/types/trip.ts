export interface Trip {
  id: string
  name: string
  startDate: Date
  endDate?: Date
  attendees: TripAttendee[]
}

export interface TripAttendee {
  id: string
  firstName: string
  lastName: string
  color: string
}
