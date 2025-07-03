import { User } from './user'

interface BaseTask {
  id: string
  name: string
  dueDate: Date
  creator: User
  completed: boolean
  notes?: string
}

export interface PollTask extends BaseTask {
  type: 'poll'
  question: string
  multiple: boolean
  options: string[]
  assignee: 'Everyone'
}

export interface GeneralTask extends BaseTask {
  type: 'general'
  description: string
  assignee: User
}

export type Task = PollTask | GeneralTask
