'use client'

import { getTrips } from '@/db'
import TripTable from '@/lib/components/TripTable'
import { Trip } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext, useState, useEffect } from 'react'

export default function PastTripsPage() {
  const user = useContext(UserContext)

  const [pastTrips, setPastTrips] = useState([])

  useEffect(() => {
    if (!user) return
    getTrips({ userId: user.id })
      .then((response) => {
        const _pastTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate < new Date()
        })

        setPastTrips(_pastTrips)
      })
      .catch((e) => console.error('Error fetching past trips', e))
  }, [user])

  if (!user) return

  return (
    <div className="p-6">
      <TripTable trips={pastTrips} title="Past trips" />
    </div>
  )
}
