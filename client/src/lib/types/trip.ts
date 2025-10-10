import { CrewMember } from './user'

export interface Trip {
  id: string
  name: string
  startDate: string
  endDate?: string
  attendees: Record<string, CrewMember>
}
