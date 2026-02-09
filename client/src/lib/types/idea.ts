import { AppColor } from './colors'

interface Creator {
  firstName: string
  lastName: string
}

export interface Idea {
  tripId: string
  id: string
  name: string
  cost?: number
  costType?: 'each' | 'total'
  url?: string
  img: string | null
  description?: string
  color: AppColor
  likes: number
  creatorId: string
  creator: Creator
}

export function isIdea(open?: string | number | boolean | Idea): open is Idea {
  return typeof open !== 'boolean' && typeof open !== 'string' && typeof open !== 'undefined'
}
