import axios from 'axios'
import { TaskPayload } from './types'
import { PollTaskOption } from '@/lib/types'

interface BaseTaskArgs {
  userId: string
  tripId: string
}

interface CreateTaskArgs extends BaseTaskArgs {
  data: { task: TaskPayload; poll_options: PollTaskOption[] | null }
}

interface UpdateTaskArgs extends BaseTaskArgs {
  data: { task: Partial<TaskPayload>; poll_options?: PollTaskOption[] }
}

// interface deleteExpenseArgs {
//   userId: string
//   tripId: string
//   expenseId: string
// }

export function createTask(args: CreateTaskArgs) {
  const { userId, tripId, data } = args

  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/task/create`

  return axios({
    method: 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function updateTask(args: UpdateTaskArgs) {
  const { userId, tripId, data } = args

  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/task/update`

  return axios({
    method: 'patch',
    url: requestUrl,
    data: { ...data, poll_options: data.poll_options || null },
    withCredentials: true
  })
}

// export function deleteExpense(args: deleteExpenseArgs) {
//   const { userId, tripId, expenseId } = args

//   const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/expense/${expenseId}/delete`

//   return axios.delete(requestUrl, {
//     withCredentials: true
//   })
// }
