import TripTable from '@/lib/components/TripTable'
import { pastTrips } from '@/lib/utils/dummyData'

export default function PastTripsPage() {
  return (
    <div className="p-6">
      <div className="text-xl font-bold mb-4">Past trips</div>
      <TripTable trips={pastTrips} />
    </div>
  )
}
