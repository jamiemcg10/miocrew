import { trips as upcomingTrips } from '@/lib/utils/dummyData'
import { tripSort } from '@/lib/utils/sortFns'
import dayjs from 'dayjs'

export default function DashboardHeader() {
  const nextTrip = upcomingTrips.sort(tripSort)[0]

  const today = dayjs(new Date())
  const nextTripStart = dayjs(nextTrip.startDate).diff(today, 'day')
  const nextTripStartMonths = dayjs(nextTrip.startDate).diff(today, 'month')

  return (
    <div className="flex justify-around px-4 py-4 items-center bg-[#cee2f5] dark:bg-white/20 font-semibold">
      <div>
        You have <span className="text-lg">{upcomingTrips.length}</span> upcoming trips!
      </div>
      <div>
        Your next trip is in{' '}
        {nextTripStart <= 90 ? (
          <span>
            <span className="text-lg">{nextTripStart}</span> days
          </span>
        ) : (
          <span>
            <span className="text-lg">{nextTripStartMonths}</span> months
          </span>
        )}
        !
      </div>
    </div>
  )
}
