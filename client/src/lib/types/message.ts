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
}

export interface RecipientOption {
  name: string
  id: string
  type: string
}
