import { Dispatch, SetStateAction } from 'react'
import { Activity } from '@/lib/types'
import dayjs from 'dayjs'
import { dateFormatter, timeFormatter } from '@/lib/utils/dateFormatter'
import Popup from '../Popup'

interface ActiveActivityProps {
  activeActivity: Activity | null
  setActiveActivity: Dispatch<SetStateAction<Activity | null>>
}

export default function ActiveActivity({ activeActivity, setActiveActivity }: ActiveActivityProps) {
  function closeActiveActivity() {
    setActiveActivity(null)
  }

  const startTime = timeFormatter(activeActivity?.startTime)
  const endTime = timeFormatter(activeActivity?.endTime)

  const endsOnDifferentDay = dayjs(activeActivity?.endTime).isAfter(
    activeActivity?.startTime,
    'day'
  )

  return (
    <Popup
      backgroundColor={activeActivity?.color}
      open={!!activeActivity}
      onClose={closeActiveActivity}>
      <div className="font-bold text-2xl">{activeActivity?.name}</div>
      <div>{dateFormatter(activeActivity?.startTime)}</div>
      <div>
        {startTime}
        {activeActivity?.endTime ? <> - {endTime}</> : null}
        {endsOnDifferentDay ? <> (Next day)</> : null}
      </div>

      <div className="font-bold">{activeActivity?.location}</div>
      <div className="mt-8">{activeActivity?.description}</div>
    </Popup>
  )
}
