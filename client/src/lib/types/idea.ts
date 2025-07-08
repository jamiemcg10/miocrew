import { AppColor } from './appColor'

export interface Idea {
  tripId: string
  id: string
  name: string
  cost?: number
  costType?: 'each' | 'total'
  url?: string
  description?: string
  color: AppColor
}
