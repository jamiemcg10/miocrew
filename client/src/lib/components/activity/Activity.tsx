import type { Activity } from '@/lib/types'
import { timeFormatter } from '@/lib/utils/dateFormatter'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import ContextMenu from '../layout/ContextMenu'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'

interface ActivityProps {
  activity: Activity
  setActiveActivity: Dispatch<SetStateAction<Activity | null>>
}

export default function Activity({ activity, setActiveActivity }: ActivityProps) {
  function handleClick() {
    setActiveActivity(activity)
  }

  function onEditActivity() {}

  function onDeleteActivity() {
    axios
      .delete(
        `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/activity/${activity.id}/delete`,
        {
          withCredentials: true
        }
      )
      .catch((e) => console.error('Error deleting idea', e))
      .finally(() => setMenuOpen(false))
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [menuOpen, setMenuOpen] = useState(false)

  const startTime = timeFormatter(activity.startTime)
  const endTime = timeFormatter(activity.endTime)

  const MIN_HEIGHT = 88
  const HEIGHT_PER_HOUR = 60

  const height = activity.endTime
    ? dayjs(activity.endTime).diff(dayjs(activity.startTime), 'hour')
    : 0

  const activityHeight = height * HEIGHT_PER_HOUR + MIN_HEIGHT

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
          onEdit={onEditActivity}
        />
      </div>
      <div className="font-bold">{activity.name}</div>
      <div className="text-sm line-clamp-1" title={activity.description}>
        {activity.description}
      </div>
    </div>
  )
}
