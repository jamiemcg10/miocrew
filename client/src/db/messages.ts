import axios from 'axios'
import { RecipientOption } from '@/lib/types'

interface BaseMessagesProps {
  userId: string
}

interface CreateMessageProps extends BaseMessagesProps {
  data: { recipients: RecipientOption[]; subject: string; body: string }
}

export function getMessages({ userId }: BaseMessagesProps) {
  return axios.get(`http://localhost:8000/user/${userId}/messages`, { withCredentials: true })
}

export function createMessage({ userId, data }: CreateMessageProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/message/create`

  return axios({ method: 'post', url: requestUrl, data, withCredentials: true })
}
