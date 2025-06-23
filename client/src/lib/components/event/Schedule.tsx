import { trips } from '@/lib/utils/dummyData'
import { Button } from '@mui/material'

// dummy data
const tripEvents = [
  {
    id: 'wm1',
    name: 'Check into AirBnB and relax',
    description: 'Arrive, hang out at AirBnB until dinner',
    location: '132 Sonoma Crest Road',
    startTime: new Date('August 5, 2026 2:00 PM'),
    endTime: new Date('August 5, 2026 6:00 PM')
  }
]

export default function Schedule() {
  const tripStart = trips[0].startDate
  const tripEnd = trips[0]?.endDate

  // calculate number of days

  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex w-full justify-end my-4 pr-4">
          <Button variant="contained" color="secondary" sx={{ width: 'initial' }}>
            Add activity
          </Button>
        </div>
        <div className="flex border border-[yellow] grow justify-between px-4">
          <div className="border border-white w-[32%] h-full">
            <div className="bg-[teal] rounded-sm">Event</div>
          </div>

          <div className="border border-white w-[32%]">
            <div className="bg-[orangered] rounded-sm">Event</div>
          </div>
          <div className="border border-white w-[32%]">
            <div className="bg-[violet] rounded-sm">Event</div>
          </div>
        </div>
      </div>
    </>
  )
}
