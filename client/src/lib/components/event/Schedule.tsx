import { trips } from '@/lib/utils/dummyData'
import { Button } from '@mui/material'
import dayjs from 'dayjs'

export default function Schedule() {
  const tripStart = dayjs(trips[0].startDate)
  const tripEnd = dayjs(trips[0]?.endDate || tripStart)

  // calculate number of days
  const tripLength = tripEnd.diff(tripStart, 'day') // (tripEnd - tripStart) / MS_PER_DAY

  // for # days, add startDay + n to array {date:Date, events:?}[]
  const days = []
  for (let i = 0; i <= tripLength; i++) {
    days.push(tripStart.add(i, 'day'))
  }

  console.log({ days })

  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex w-full justify-end my-4 pr-4">
          <Button variant="contained" color="secondary" sx={{ width: 'initial' }}>
            Add activity
          </Button>
        </div>
        <div
          className="flex grow justify-between px-6 space-x-6 overflow-x-scroll"
          style={{ scrollSnapType: 'x mandatory' }}>
          {days.map((_day, i) => {
            return (
              <div
                className="bg-[#29293A] w-full sm:w-[40%] md:w-[30%] shrink-0 h-full xbg-[#1a1a1a] rounded-sm"
                key={i}
                style={{ scrollSnapAlign: 'start', scrollMargin: i ? '64px' : '32px' }}>
                <div className="bg-[teal] rounded-sm">Event</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
