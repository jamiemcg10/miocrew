interface BaseTask {
  id: string
  name: string
  dueDate: Date
  assignee: string
  creator: string
  notes?: string
}
interface PollTask extends BaseTask {
  type: 'poll'
  question: string
  options: string[]
  assignee: 'Everyone'
}

interface ReservationTask extends BaseTask {
  type: 'reservation'
  description: string
}

export type Task = PollTask | ReservationTask
