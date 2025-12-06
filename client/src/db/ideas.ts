import axios from 'axios'
import { Idea } from '@/lib/types'

interface BaseIdeaArgs {
  userId: string
  tripId: string
}

interface CreateIdeaArgs extends BaseIdeaArgs {
  data: Partial<Idea>
}

type UpdateIdeaArgs = CreateIdeaArgs

interface DeleteIdeaArgs extends BaseIdeaArgs {
  ideaId: string
}

export function getIdeas(args: BaseIdeaArgs) {
  const { userId, tripId } = args

  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/ideas/`,
    {
      withCredentials: true
    }
  )
}

export function createIdea(args: CreateIdeaArgs) {
  const { userId, tripId, data } = args

  return axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/ideas/create`,
    data,
    withCredentials: true
  })
}

export function updateIdea(args: UpdateIdeaArgs) {
  const { userId, tripId, data } = args

  return axios({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/idea/update`,
    data,
    withCredentials: true
  })
}

export function deleteIdea(args: DeleteIdeaArgs) {
  const { userId, tripId, ideaId } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/idea/${ideaId}/delete`

  return axios.delete(requestUrl, {
    withCredentials: true
  })
}
