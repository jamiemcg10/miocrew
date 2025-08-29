import { AppColor } from './appColor'

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
