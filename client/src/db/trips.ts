import axios from 'axios'

interface GetTripsProps {
  userId: string
}

export function getTrips({ userId }: GetTripsProps) {
  return axios.get(`http://localhost:8000/user/${userId}/trips`, { withCredentials: true })
}
