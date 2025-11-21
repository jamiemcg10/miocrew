import type { Activity } from '@/lib/types'
import { timeFormatter } from '@/lib/utils/dateFormatter'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import ContextMenu from '../layout/ContextMenu'
import axios from 'axios'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { ScheduleContext } from '@/lib/utils/contexts/ScheduleContext'
import { deleteActivity } from '@/db'

interface ActivityProps {
  activity: Activity
  setActiveActivity: Dispatch<SetStateAction<Activity | null>>
}

export default function Activity({ activity, setActiveActivity }: ActivityProps) {
  function handleClick() {
    setActiveActivity(activity)
  }

  function onDeleteActivity() {
    if (!user || !trip) return

    deleteActivity({ userId: user.id, tripId: trip.id, activityId: activity.id })
      .catch((e) => console.error('Error deleting idea', e))
      .finally(() => setMenuOpen(false))
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)
  const { onEdit } = useContext(ScheduleContext)

  const [menuOpen, setMenuOpen] = useState(false)

  const startTime = timeFormatter(activity.startTime)
  const endTime = timeFormatter(activity.endTime)

  const MIN_HEIGHT = 88
  const HEIGHT_PER_HOUR = 60

  const height = activity.endTime
    ? dayjs(activity.endTime).diff(dayjs(activity.startTime), 'hour')
    : 0

  const activityHeight = height * HEIGHT_PER_HOUR + MIN_HEIGHT

  if (!user || !trip) return

  return (
    <div
      className="rounded-xs p-2 min-h-22 max-h-72 overflow-y-hidden cursor-pointer"
      key={activity.id}
      style={{ backgroundColor: activity.color, height: `${activityHeight}px` }}
      onClick={handleClick}>
      <div className="font-bold text-sm flex justify-between items-center">
        <span>
          {startTime} {activity.endTime ? `- ${endTime}` : null}
        </span>
        <ContextMenu
          open={menuOpen}
          setMenuOpen={setMenuOpen}
          onClose={() => setMenuOpen(false)}
          onDelete={onDeleteActivity}
          onEdit={() => onEdit(activity)}
        />
      </div>
      <div className="font-bold">{activity.name}</div>
      <div className="text-sm line-clamp-1" title={activity.description}>
        {activity.description}
      </div>
    </div>
  )
}
