import axios from 'axios'

interface BaseProps {
  userId: string
}

interface AddCrewProps extends BaseProps {
  tripId: string
  ids: string[]
}

interface DeleteCrewProps extends BaseProps {
  tripId: string
  attendeeId: string
}

export function getTrips({ userId }: BaseProps) {
  return axios.get(`http://localhost:8000/user/${userId}/trips`, { withCredentials: true })
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
