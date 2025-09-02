import type { Activity } from '@/lib/types'
import { timeFormatter } from '@/lib/utils/dateFormatter'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction } from 'react'

interface ActivityProps {
  activity: Activity
  setActiveActivity: Dispatch<SetStateAction<Activity | null>>
}

export default function Activity({ activity, setActiveActivity }: ActivityProps) {
  function handleClick() {
    setActiveActivity(activity)
  }

  const startTime = timeFormatter(activity.startTime)
  const endTime = timeFormatter(activity.endTime)

  const height = activity.endTime
    ? dayjs(activity.endTime).diff(dayjs(activity.startTime), 'hour')
    : 0

  const activityHeight = height * 60 + 80
  return (
    <div
      className="rounded-xs p-2 min-h-20 max-h-72 overflow-y-hidden cursor-pointer"
      key={activity.id}
      style={{ backgroundColor: activity.color, height: `${activityHeight}px` }}
      onClick={handleClick}>
      <div className="font-bold text-sm">
        {startTime} {activity.endTime ? `- ${endTime}` : null}
      </div>
      <div className="font-bold">{activity.name}</div>
      <div className="text-sm line-clamp-1" title={activity.description}>
        {activity.description}
      </div>
    </div>
  )
}
