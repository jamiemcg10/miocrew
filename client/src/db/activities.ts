import axios from 'axios'
import { Activity } from '@/lib/types'

interface BaseActivityArgs {
  userId: string
  tripId: string
}

interface CreateActivityArgs extends BaseActivityArgs {
  data: Partial<Activity>
}

type UpdateActivityArgs = CreateActivityArgs

interface DeleteActivityArgs extends BaseActivityArgs {
  activityId: string
}

export function getActivities({ userId, tripId }: BaseActivityArgs) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/activities`,
    {
      withCredentials: true
    }
  )
}

export function createActivity({ userId, tripId, data }: CreateActivityArgs) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/activities/create`

  return axios({
    method: 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function updateActivity({ userId, tripId, data }: UpdateActivityArgs) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/activity/update`

  return axios({
    method: 'patch',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function deleteActivity({ userId, tripId, activityId }: DeleteActivityArgs) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/activity/${activityId}/delete`,
    {
      withCredentials: true
    }
  )
}
