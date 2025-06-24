import './Schedule.css'

import { trips } from '@/lib/utils/dummyData'
import { Button } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { RefObject, useRef } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

interface Day {
  date: Dayjs
  ref: RefObject<HTMLDivElement | null>
}
export default function Schedule() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const tripStart = dayjs(trips[0].startDate)
  const tripEnd = dayjs(trips[0]?.endDate || tripStart)

  // calculate number of days
  const tripLength = tripEnd.diff(tripStart, 'day') // (tripEnd - tripStart) / MS_PER_DAY

  // for # days, add startDay + n to array {date:Date, events:?}[]
  const days: Day[] = []
  for (let i = 0; i <= tripLength; i++) {
    days.push({ date: tripStart.add(i, 'day'), ref: useRef(null) })
  }

  console.log({ days })

  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex w-full justify-end my-4 pr-4">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ width: 'initial', fontWeight: 600 }}>
            Add activity
          </Button>
        </div>
        <div className="grow relative mb-1">
          <div className="absolute w-8 text-4xl content-center top-0 bottom-4 left-0 bg-linear-to-l from-transparent to-(--background) dark:to-[#00001a]"></div>
          <div
            className="flex grow justify-between px-8 space-x-6 overflow-x-scroll h-full pb-2"
            style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
            ref={scrollContainerRef}>
            {days.map((day, i) => {
              return (
                <div
                  key={i}
                  className="w-[92%] sm:w-[40%] md:w-[30%] shrink-0 h-full flex flex-col">
                  <div className="text-center text-3xl">{day.date.format('dddd')}</div>
                  <div className="text-center text-2xl mb-4">{day.date.format('MMMM D, YYYY')}</div>
                  <div
                    className="bg-[#9b9bc7] dark:bg-[#29293A] rounded-sm grow"
                    ref={day.ref}
                    style={{ scrollSnapAlign: 'start', scrollMargin: i ? '64px' : '32px' }}>
                    <div className="bg-[teal] rounded-sm">Event</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="absolute w-8 top-0 bottom-4 right-0 text-4xl content-center bg-linear-to-r from-transparent to-(--background) dark:to-[#00001a]"></div>
        </div>
      </div>
    </>
  )
}
