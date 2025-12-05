import { CrewMember } from '@/lib/types'
import axios from 'axios'

interface BaseProps {
  userId: string
}

export interface CreateTripProps extends BaseProps {
  data: {
    name: string
    location: string
    description: string
    start_date: string
    end_date?: string
    ids: string[]
  }
}

interface BaseCrewProps extends BaseProps {
  tripId: string
}

interface AddCrewProps extends BaseCrewProps {
  ids: string[]
}

interface DeleteCrewProps extends BaseCrewProps {
  attendeeId: string
}

interface ToggleCrewTypeProps extends BaseCrewProps {
  attendeeId: string
  newType: CrewMember['type']
}

export function getTrips({ userId }: BaseProps) {
  return axios.get(`http://localhost:8000/user/${userId}/trips`, { withCredentials: true })
}

export function createTrip({ userId, data }: CreateTripProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/trip/create`

  return axios({
    method: 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function addCrew({ userId, tripId, ids }: AddCrewProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/crew/add`

  return axios({
    method: 'post',
    url: requestUrl,
    data: ids,
    withCredentials: true
  })
}

export function removeCrew({ userId, tripId, attendeeId }: DeleteCrewProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/crew/remove/${attendeeId}`

  return axios({
    method: 'delete',
    url: requestUrl,
    withCredentials: true
  })
}

export function toggleCrewType({ userId, tripId, attendeeId, newType }: ToggleCrewTypeProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/crew/toggle/${newType}/${attendeeId}`

  return axios({
    method: 'patch',
    url: requestUrl,
    withCredentials: true
  })
}
