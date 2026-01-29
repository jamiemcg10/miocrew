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
    end_date: string
    ids: string[]
  }
}

interface BaseTripProps extends BaseProps {
  tripId: string
}

type BaseCrewProps = BaseTripProps

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
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trips`, {
    withCredentials: true
  })
}

export function getTrip({ userId, tripId }: BaseTripProps) {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}`, {
    withCredentials: true
  })
}

export function createTrip({ userId, data }: CreateTripProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/create`

  return axios({
    method: 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function addCrew({ userId, tripId, ids }: AddCrewProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/crew/add`

  return axios({
    method: 'post',
    url: requestUrl,
    data: ids,
    withCredentials: true
  })
}

export function removeCrew({ userId, tripId, attendeeId }: DeleteCrewProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/crew/remove/${attendeeId}`

  return axios({
    method: 'delete',
    url: requestUrl,
    withCredentials: true
  })
}

export function toggleCrewType({ userId, tripId, attendeeId, newType }: ToggleCrewTypeProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/crew/toggle/${newType}/${attendeeId}`

  return axios({
    method: 'patch',
    url: requestUrl,
    withCredentials: true
  })
}
