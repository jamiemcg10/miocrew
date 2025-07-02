import { Dispatch, SetStateAction } from 'react'
import { TripEvent } from '@/lib/types'
import dayjs from 'dayjs'
import { dateFormatter, timeFormatter } from '@/lib/utils/dateFormatter'
import Popup from '../Popup'

interface ActiveEventProps {
  activeEvent: TripEvent | null
  setActiveEvent: Dispatch<SetStateAction<TripEvent | null>>
}

export default function ActiveEvent({ activeEvent, setActiveEvent }: ActiveEventProps) {
  const startTime = timeFormatter(activeEvent?.startTime)
  const endTime = timeFormatter(activeEvent?.endTime)

  const endsOnDifferentDay = dayjs(activeEvent?.endTime).isAfter(activeEvent?.startTime, 'day')

  return (
    <Popup
      backgroundColor={activeEvent?.color}
      open={!!activeEvent}
      onClose={() => setActiveEvent(null)}>
      <div className="font-bold text-2xl">{activeEvent?.name}</div>
      <div>{dateFormatter(activeEvent?.startTime)}</div>
      <div>
        {startTime}
        {activeEvent?.endTime ? <> - {endTime}</> : null}
        {endsOnDifferentDay ? <> (Next day)</> : null}
      </div>

      <div className="font-bold">{activeEvent?.location}</div>
      <div className="mt-8">{activeEvent?.description}</div>
    </Popup>
  )
}
