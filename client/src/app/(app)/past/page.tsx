import TripTable from '@/lib/components/TripTable'
import { trips } from '@/lib/utils/dummyData'

export default function PastTripsPage() {
  const pastTrips = trips.filter((trip) => {
    return trip.startDate <= new Date()
  })

  return (
    <div className="p-6">
      <TripTable trips={pastTrips} title="Past trips" />
    </div>
  )
}
