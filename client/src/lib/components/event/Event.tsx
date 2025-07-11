import { TripEvent } from '@/lib/types/tripEvent'
import { timeFormatter } from '@/lib/utils/dateFormatter'
import dayjs from 'dayjs'

interface EventProps {
  event: TripEvent
  onClick: () => void
}

export default function Event({ event, onClick }: EventProps) {
  const startTime = timeFormatter(event.startTime)
  const endTime = timeFormatter(event.endTime)

  const height = event.endTime ? dayjs(event.endTime).diff(dayjs(event.startTime), 'hour') : 0

  const eventHeight = height * 60 + 80
  return (
    <div
      className="rounded-xs p-2 min-h-20 max-h-72 overflow-y-hidden cursor-pointer"
      key={event.id}
      style={{ backgroundColor: event.color, height: `${eventHeight}px` }}
      onClick={() => onClick()}>
      <div className="font-bold text-sm">
        {startTime} {event.endTime ? `- ${endTime}` : null}
      </div>
      <div className="font-bold">{event.name}</div>
      <div className="text-sm line-clamp-1" title={event.description}>
        {event.description}
      </div>
    </div>
  )
}
