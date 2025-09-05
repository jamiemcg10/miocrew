'use client'

import DashboardHeader from './DashboardHeader'
import Dashboard from './Dashboard'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { Trip } from '@/lib/types'

export default function DashboardPage() {
  function getUpcomingTrips() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trips`, { withCredentials: true }) // get address from env
      .then((response) => {
        const _upcomingTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate >= new Date()
        })
        setUpcomingTrips(_upcomingTrips)
      })
      .catch((e) => console.error('Error fetching upcoming trips', e))
  }

  const user = useContext(UserContext)
  const [upcomingTrips, setUpcomingTrips] = useState([])

  if (!user) return

  useEffect(getUpcomingTrips, [])

  return (
    <>
      <DashboardHeader upcomingTrips={upcomingTrips} />
      <Dashboard upcomingTrips={upcomingTrips} />
    </>
  )
}
