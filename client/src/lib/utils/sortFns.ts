import { CrewMember, Trip, Activity } from '../types'

export const attendeeSort = (a: CrewMember, _b: CrewMember) => {
  return a.type === 'Captain' ? -1 : a.type === 'Admin' ? 0 : 1
}

export const scheduleSort = (a: Activity, b: Activity) => {
  return a.startTime < b.startTime ? -1 : 1
}

export const tripSort = (a: Trip, b: Trip) => (a.startDate > b.startDate ? 1 : -1)
