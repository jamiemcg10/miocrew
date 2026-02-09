import { createContext } from 'react'
import { Activity } from '../../types'

export const ScheduleContext = createContext<{ onEdit: (v: Activity) => void }>({
  onEdit: ({}) => {}
})
