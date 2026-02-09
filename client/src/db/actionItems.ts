import axios from 'axios'

interface GetActionItemsProps {
  userId: string
}

export function getActionItems({ userId }: GetActionItemsProps) {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/action_items`, {
    withCredentials: true
  })
}
