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

interface BulkUpdateMessageProps extends BaseMessagesProps {
  messageIds: string[]
  status: 'read' | 'unread'
}

interface BulkDeleteMessageProps extends BaseMessagesProps {
  messageIds: string[]
}

export function getMessages({ userId }: BaseMessagesProps) {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/messages`, {
    withCredentials: true
  })
}

export function createMessage({ userId, data }: CreateMessageProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/message/create`

  return axios({
    method: 'post',
    url: requestUrl,
    data: { ...data, sent_date: new Date().toISOString() },
    withCredentials: true
  })
}

export function toggleMessageReadStatus({ userId, messageId, status }: UpdateMessageProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/message/${messageId}/change_read_status`

  return axios({
    method: 'patch',
    url: requestUrl,
    data: { read_status: status },
    withCredentials: true
  })
}

export function bulkToggleMessageReadStatus({
  userId,
  messageIds,
  status
}: BulkUpdateMessageProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/message/bulk/change_read_status/${status}`

  return axios({
    method: 'patch',
    url: requestUrl,
    data: messageIds,
    withCredentials: true
  })
}

export function deleteMessage({ userId, messageId }: DeleteMessageProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/message/${messageId}/delete`

  return axios({ method: 'delete', url: requestUrl, withCredentials: true })
}

export function bulkDeleteMessage({ userId, messageIds }: BulkDeleteMessageProps) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/message/delete`

  return axios({ method: 'delete', url: requestUrl, data: messageIds, withCredentials: true })
}
