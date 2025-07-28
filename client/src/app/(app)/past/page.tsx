import TripTable from '@/lib/components/TripTable'
import { pastTrips } from '@/lib/utils/dummyData'

export default function PastTripsPage() {
  return (
    <div className="p-6">
      <TripTable trips={pastTrips} title="Past trips" />
    </div>
  )
}
