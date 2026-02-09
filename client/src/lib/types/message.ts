import { User } from './user'

export interface BaseMessage {
  // TODO: rename this to Message
  id: string
  subject: string
  body: string
  read: boolean
  senderId: string
  sender: User
  recipientId: string
  sentDate: string
}

export interface RecipientOption {
  name: string
  id: string
  type: string
}

export function isMessage(v?: boolean | string | BaseMessage | any[]): v is BaseMessage {
  return (
    typeof v !== 'boolean' &&
    typeof v !== 'string' &&
    v !== undefined &&
    Object.hasOwn(v, 'subject')
  )
}
