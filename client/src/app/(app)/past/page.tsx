'use client'

import TripTable from '@/lib/components/TripTable'
import { Trip } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'

export default function PastTripsPage() {
  const user = useContext(UserContext)
  // get past trips
  const [pastTrips, setPastTrips] = useState([])

  function getPastTrips() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trips`, { withCredentials: true }) // TODO: get address from env
      .then((response) => {
        const _pastTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate < new Date()
        })

        setPastTrips(_pastTrips)
      })
      .catch((e) => console.error('Error fetching past trips', e))
  }

  useEffect(getPastTrips, [])

  if (!user) return

  return (
    <div className="p-6">
      <TripTable trips={pastTrips} title="Past trips" />
    </div>
  )
}
