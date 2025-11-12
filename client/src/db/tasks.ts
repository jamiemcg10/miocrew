import axios from 'axios'
import { TaskPayload } from './types'
import { PollTaskOption } from '@/lib/types'

interface AddTaskArgs {
  userId: string
  tripId: string
  data: { task: TaskPayload; poll_options: PollTaskOption[] | null }
}

// interface deleteExpenseArgs {
//   userId: string
//   tripId: string
//   expenseId: string
// }

export function addTask(args: AddTaskArgs) {
  const { userId, tripId, data } = args

  const isUpdate = !!data.task.id

  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/task/${
    isUpdate ? 'update' : 'create'
  }`

  return axios({
    method: isUpdate ? 'patch' : 'post',
    url: requestUrl,
    data,
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
