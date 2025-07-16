import { CrewMember } from './user'

export interface Trip {
  id: string
  name: string
  startDate: Date
  endDate?: Date
  attendees: Record<string, CrewMember>
}
