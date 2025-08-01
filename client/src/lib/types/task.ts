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

export interface PollTask extends BaseTask {
  type: 'poll'
  multiple: boolean
  options: string[]
  assignee: 'Everyone'
}

export interface GeneralTask extends BaseTask {
  type: 'general'
  assignee: string
}

export type Task = PollTask | GeneralTask
