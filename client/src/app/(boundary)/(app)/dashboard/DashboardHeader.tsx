import { Trip } from '@/lib/types'
import { tripSort } from '@/lib/utils/sortFns'
import dayjs from 'dayjs'
import { Suspense } from 'react'

interface DashboardHeaderProps {
  upcomingTrips: Trip[]
}

const today = new Date()

function DayCountdown({ nextTrip }: { nextTrip: Trip }) {
  const nextTripStart = dayjs(nextTrip?.startDate).diff(dayjs(today), 'day')
  const nextTripStartMonths = dayjs(nextTrip?.startDate).diff(dayjs(today), 'month')

  return nextTripStart <= 90 ? (
    <span>
      <span className="text-lg">{nextTripStart}</span> days
    </span>
  ) : (
    <span>
      <span className="text-lg">{nextTripStartMonths}</span> months
    </span>
  )
}

export default function DashboardHeader({ upcomingTrips }: DashboardHeaderProps) {
  const nextTrip = upcomingTrips
    .filter((trip) => new Date(trip.startDate) >= today)
    .sort(tripSort)[0]

  return (
    <div className="flex justify-around px-4 py-4 items-center bg-[#cee2f5] dark:bg-white/20 font-semibold">
      <div>
        You have <span className="text-lg">{upcomingTrips.length}</span> upcoming trips!
      </div>
      <div>
        Your next trip is in{' '}
        <Suspense>
          <DayCountdown nextTrip={nextTrip} />
        </Suspense>
        !
      </div>
    </div>
  )
}
