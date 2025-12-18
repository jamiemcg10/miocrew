import { isTask, PollTaskOption, Task } from '@/lib/types'

type Field<T> = {
  value: T
  valid: boolean
}

function getInitialValue(value?: string | PollTaskOption[]) {
  return {
    value,
    valid: true
  }
}

interface TaskState {
  name: Field<string>
  description: Field<string>
  type: Field<'general' | 'poll'>
  assigneeId: Field<string>
  dueDate: Field<string | undefined>
  pollQuestion: Field<string>
  pollOptions: Field<PollTaskOption[]>
}

const DEFAULT_POLL_OPTIONS = [
  { label: '', votes: 0 },
  { label: '', votes: 0 }
]

const TASK_FIELDS = [
  'name',
  'type',
  'assigneeId',
  'dueDate',
  'description',
  'pollQuestion',
  'pollOptions'
]

export const initialTaskState = {
  name: getInitialValue(''),
  description: getInitialValue(''),
  type: getInitialValue('general'),
  assigneeId: getInitialValue(''),
  dueDate: getInitialValue(),
  pollQuestion: getInitialValue(''),
  pollOptions: getInitialValue(DEFAULT_POLL_OPTIONS)
} as TaskState

export function taskReducer(
  state: TaskState,
  action: { type: string; value?: string | PollTaskOption[] | Task }
) {
  if (action.type === 'set-task') {
    if (isTask(action.value)) {
      const value = action.value

      return TASK_FIELDS.reduce((acc, c) => {
        const k = c as keyof Task

        return {
          ...acc,
          [c]: { value: value[k], valid: true }
        }
      }, {} as TaskState)
    } else {
      return initialTaskState
    }
  }
  return {
    ...state,
    [action.type]: {
      value: action.value,
      valid: !!action.value
    }
  }
}
