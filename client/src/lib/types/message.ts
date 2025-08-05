export interface BaseMessage {
  // TODO: rename this to Message
  id: string
  subject: string
  body: string
  read: boolean
  senderId: string
  recipientId: string
}
