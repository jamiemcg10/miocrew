'use client'

import TripTable from '@/lib/components/TripTable'
import { Trip } from '@/lib/types'
import { UserContext } from '@/lib/utils/UserContext'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'

export default function PastTripsPage() {
  const user = useContext(UserContext)
  // get past trips
  const [pastTrips, setPastTrips] = useState([])

  function getPastTrips() {
    axios
      .get(`http://localhost:8000/users/${user!.id}/trips`) // get address from env
      .then((response) => {
        console.log({ response })
        const _pastTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate < new Date()
        })
        setPastTrips(_pastTrips)
        console.log({ _pastTrips, pastTrips })
      })
      .catch(console.error)
  }

  useEffect(getPastTrips, [])

  if (!user) return

  return (
    <div className="p-6">
      <TripTable trips={pastTrips} title="Past trips" />
    </div>
  )
}
