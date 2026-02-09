import { Trip } from '@/lib/types'
import { tripSort } from '@/lib/utils/sortFns'
import Skeleton from '@mui/material/Skeleton'
import dayjs from 'dayjs'

interface DashboardHeaderProps {
  upcomingTrips?: Trip[]
}

interface DayCountdownProps {
  nextTrip?: Trip
}

const skeletonSx = { mx: 0.5 }

const today = new Date()

function DayCountdown({ nextTrip }: DayCountdownProps) {
  const nextTripStart = dayjs(nextTrip?.startDate).diff(dayjs(today), 'day')
  const nextTripStartMonths = dayjs(nextTrip?.startDate).diff(dayjs(today), 'month')

  if (!nextTrip) {
    return (
      <div className="inline-flex items-center">
        <Skeleton variant="rounded" height={18} width={20} sx={skeletonSx} /> <span>days</span>
      </div>
    )
  }

  return nextTripStart <= 90 ? (
    <span>
      <span className="text-lg ml-1">{nextTripStart}</span> days
    </span>
  ) : (
    <span>
      <span className="text-lg">{nextTripStartMonths}</span> months
    </span>
  )
}

export default function DashboardHeader({ upcomingTrips }: DashboardHeaderProps) {
  const nextTrip = upcomingTrips
    ?.filter((trip) => new Date(trip.startDate) >= today)
    .sort(tripSort)[0]

  return (
    <div className="flex justify-around px-4 py-4 items-center bg-[#cee2f5] dark:bg-white/20 font-semibold flex-wrap">
      <div className="flex items-center">
        You have
        <span className="text-lg mx-1">
          {upcomingTrips?.length || <Skeleton variant="rounded" height={18} width={20} />}
        </span>
        upcoming trips!
      </div>
      <div className="flex items-center">
        Your next trip is in <DayCountdown nextTrip={nextTrip} />!
      </div>
    </div>
  )
}
