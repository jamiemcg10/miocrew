export interface BaseMessage {
  id: string
  subject: string
  body: string
  read: boolean
  sender: string
  recipients: string[] // put in separate table
}
