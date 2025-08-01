import Event from './Event'
import { TripEvent } from '@/lib/types/tripEvent'
import { scheduleSort } from '@/lib/utils/sortFns'
import dayjs from 'dayjs'
import ActiveEvent from './ActiveEvent'
import { useState } from 'react'

interface ScheduleDayProps {
  day: { date: dayjs.Dayjs; events: TripEvent[] }
  index: number
}

export default function ScheduleDay({ day, index }: ScheduleDayProps) {
  const [activeEvent, setActiveEvent] = useState<TripEvent | null>(null)

  return (
    <>
      <div className="w-[92%] sm:w-[40%] md:w-[30%] shrink-0 h-full flex flex-col">
        <div className="relative grow flex flex-col overflow-y-hidden">
          <div className="text-center text-2xl sm:text-3xl">{day.date.format('dddd')}</div>
          <div className="text-center text-xl mb-2 sm:mb-4 relative">
            {day.date.format('MMMM D, YYYY')}
            <div className="h-1 absolute -bottom-3 sm:-bottom-5 z-1 w-full rounded-t-sm bg-linear-to-b from-[#9b9bc7] dark:from-[#29293A] to-transparent"></div>
          </div>
          <div
            className="relative bg-[#9b9bc7] dark:bg-[#29293A] rounded-sm grow py-1 overflow-y-scroll"
            style={{ scrollSnapAlign: 'start', scrollMargin: index ? '64px' : '32px' }}>
            <div className="flex flex-col space-y-3">
              {day.events.sort(scheduleSort).map((event) => {
                return <Event event={event} key={event.id} setActiveEvent={setActiveEvent} />
              })}
            </div>
          </div>
          <div className="h-1 absolute bottom-0 w-full rounded-b-sm bg-linear-to-t from-[#9b9bc7] dark:from-[#29293A] to-transparent"></div>
        </div>
      </div>
      <ActiveEvent activeEvent={activeEvent} setActiveEvent={setActiveEvent} />
    </>
  )
}
