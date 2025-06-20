export interface Trip {
  id: string
  name: string
  startDate: Date
  endDate?: Date
  attendees: any[]
}

export interface TripAttendee {
  id: string
  name: string
  color: string
}
