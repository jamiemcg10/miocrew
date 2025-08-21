import { CrewMember } from './user'

interface BaseTask {
  id: string
  tripId: string
  name: string
  description: string // poll question or general task description
  dueDate: Date
  creator: string
  completed: boolean
  notes?: string
}

export interface PollTaskOption {
  label: string
  id: string
  taskId: string
  votes: number
}

export interface PollTask extends BaseTask {
  type: 'poll'
  multiple: boolean
  options: PollTaskOption[]
  assigneeId: 'Everyone'
}

export interface GeneralTask extends BaseTask {
  type: 'general'
  assigneeId: string
  assignee: CrewMember
}

export type Task = PollTask | GeneralTask
