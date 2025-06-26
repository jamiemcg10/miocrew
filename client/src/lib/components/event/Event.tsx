import { TripEvent } from '@/lib/types/tripEvent'
import dayjs from 'dayjs'

interface EventProps {
  event: TripEvent
}

export default function Event({ event }: EventProps) {
  const startTime = dayjs(event.startTime).format('h:mm A')
  const endTime = dayjs(event.endTime).format('h:mm A')

  const height = event.endTime ? dayjs(event.endTime).diff(dayjs(event.startTime), 'hour') : 0

  const eventHeight = height * 60 + 80
  return (
    <div
      className="rounded-xs p-2 min-h-20 max-h-72 overflow-y-hidden"
      key={event.id}
      style={{ backgroundColor: event.color, height: `${eventHeight}px` }}>
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
