export interface TripEvent {
  id: string
  tripId: string
  name: string
  description?: string
  location: string
  startTime: Date
  endTime?: Date
  color: string
}
