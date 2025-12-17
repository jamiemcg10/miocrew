'use client'

import { getTrips } from '@/db'
import TripTable from '@/lib/components/TripTable'
import { Trip } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { useContext, useState, useEffect } from 'react'

export default function PastTripsPage() {
  const user = useContext(UserContext)

  function fetchPastTrips() {
    getTrips({ userId: user!.id })
      .then((response) => {
        const _pastTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate < new Date()
        })

        setPastTrips(_pastTrips)
        LocalStorage.set('past-trips', _pastTrips)
      })
      .catch((e) => console.error('Error fetching past trips', e))
  }

  const storedPastTrips = LocalStorage.get<Trip[]>('past-trips')

  const [pastTrips, setPastTrips] = useState(storedPastTrips || [])

  useEffect(() => {
    if (!user) return

    fetchPastTrips()
  }, [user])

  if (!user) return

  return (
    <div className="p-6">
      <TripTable trips={pastTrips} title="Past trips" />
    </div>
  )
}
