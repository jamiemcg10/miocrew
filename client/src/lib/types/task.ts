import { User } from './user'

interface BaseTask {
  id: string
  name: string
  dueDate: Date
  creator: User
  completed: boolean
  notes?: string
}
interface PollTask extends BaseTask {
  type: 'poll'
  question: string
  options: string[]
  assignee: 'Everyone'
}

interface GeneralTask extends BaseTask {
  type: 'general'
  description: string
  assignee: User
}

export type Task = PollTask | GeneralTask
