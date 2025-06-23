import { TripEvent } from '@/lib/types/tripEvent'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'short'
})

interface EventProps {
  event: TripEvent
}

export default function Event({ event }: EventProps) {
  return (
    <div className="rounded-sm" style={{ backgroundColor: event.color }}>
      <div>
        {timeFormatter.format(event.startTime)} - {event.name}
      </div>
    </div>
  )
}
