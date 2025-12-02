import axios from 'axios'
import { RecipientOption } from '@/lib/types'

interface BaseMessagesProps {
  userId: string
}

interface CreateMessageProps extends BaseMessagesProps {
  data: { recipients: RecipientOption[]; subject: string; body: string }
}

interface DeleteMessageProps extends BaseMessagesProps {
  messageId: string
}

interface UpdateMessageProps extends BaseMessagesProps {
  messageId: string
  status: boolean
}

export function getMessages({ userId }: BaseMessagesProps) {
  return axios.get(`http://localhost:8000/user/${userId}/messages`, { withCredentials: true })
}

export function createMessage({ userId, data }: CreateMessageProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/message/create`

  return axios({ method: 'post', url: requestUrl, data, withCredentials: true })
}

export function toggleMessageReadStatus({ userId, messageId, status }: UpdateMessageProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/message/${messageId}/change_read_status`

  return axios({
    method: 'patch',
    url: requestUrl,
    data: { read_status: status },
    withCredentials: true
  })
}

export function deleteMessage({ userId, messageId }: DeleteMessageProps) {
  const requestUrl = `http://localhost:8000/user/${userId}/message/${messageId}/delete`

  return axios({ method: 'delete', url: requestUrl, withCredentials: true })
}
