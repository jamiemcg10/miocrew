import axios from 'axios'
import { TaskPayload } from './types'
import { PollTaskOption } from '@/lib/types'

interface BaseTaskArgs {
  userId: string
  tripId: string
}

interface BasePollArgs {
  userId: string
  taskId: string
}

interface CreateTaskArgs extends BaseTaskArgs {
  data: { task: TaskPayload; poll_options: PollTaskOption[] | null }
}

interface UpdateTaskArgs extends BaseTaskArgs {
  data: { task: Partial<TaskPayload>; poll_options?: PollTaskOption[] | null }
}

interface UpdatePollVoteArgs extends BasePollArgs, BaseTaskArgs {
  ids: string[]
}

interface DeleteTaskArgs extends BaseTaskArgs {
  taskId: string
}

export function getTasks(args: BaseTaskArgs) {
  const { tripId, userId } = args
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/tasks`,
    {
      withCredentials: true
    }
  )
}

export function createTask(args: CreateTaskArgs) {
  const { userId, tripId, data } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/task/create`

  return axios({
    method: 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function updateTask(args: UpdateTaskArgs) {
  const { userId, tripId, data } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/task/update`

  return axios({
    method: 'patch',
    url: requestUrl,
    data: { ...data, poll_options: data.poll_options || null },
    withCredentials: true
  })
}

export function getPollVotes(args: BasePollArgs) {
  const { userId, taskId } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/task/${taskId}/poll/votes/get`

  return axios({
    method: 'get',
    url: requestUrl,
    withCredentials: true
  })
}

export function updatePollVote(args: UpdatePollVoteArgs) {
  const { userId, tripId, taskId, ids } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/task/${taskId}/poll/vote`

  return axios({
    method: 'patch',
    url: requestUrl,
    data: ids,
    withCredentials: true
  })
}

// export function closePoll(args: ClosePollArgs){
//   const { userId, tripId, taskId } = args

//   const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/trip/${tripId}/task/${taskId}/mark_complete`

//   return axios({
//     method: 'patch',
//     url: requestUrl,
//     data: ids,
//     withCredentials: true
//   })
// }

export function deleteTask(args: DeleteTaskArgs) {
  const { userId, tripId, taskId } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/task/${taskId}/delete`

  return axios.delete(requestUrl, {
    withCredentials: true
  })
}
