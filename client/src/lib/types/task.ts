import { CrewMember } from './user'

interface BaseTask {
  id: string
  tripId: string
  name: string
  dueDate: string
  creatorId: string
  creator: CrewMember
  completed: boolean
  notes?: string
}

export interface PollTaskOption {
  label: string
  id?: string
  taskId?: string
  votes: number
}

export interface PollTask extends BaseTask {
  type: 'poll'
  multiple: boolean
  pollQuestion: string
  pollOptions: PollTaskOption[]
  assigneeId: 'Everyone'
}

export interface GeneralTask extends BaseTask {
  type: 'general'
  description: string
  assigneeId: string
  assignee: CrewMember
}

export type Task = PollTask | GeneralTask

export function isTask(open: string | boolean | undefined | Task | any[]): open is Task {
  return (
    typeof open !== 'boolean' &&
    typeof open !== 'string' &&
    typeof open !== 'undefined' &&
    Object.hasOwn(open, 'name')
  )
}
