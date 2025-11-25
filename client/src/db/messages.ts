import axios from 'axios'

interface GetMessagesProps {
  userId: string
}
export function getMessages({ userId }: GetMessagesProps) {
  return axios.get(`http://localhost:8000/user/${userId}/messages`, { withCredentials: true })
}
