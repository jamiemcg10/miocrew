'use client'

import DashboardHeader from './DashboardHeader'
import Dashboard from './Dashboard'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { Trip } from '@/lib/types'
import { getTrips } from '@/db'

export default function DashboardPage() {
  const user = useContext(UserContext)
  const [upcomingTrips, setUpcomingTrips] = useState([])

  if (!user) return

  useEffect(() => {
    if (!user) return

    getTrips({ userId: user.id })
      .then((response) => {
        const _upcomingTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate >= new Date()
        })
        setUpcomingTrips(_upcomingTrips)
      })
      .catch((e) => console.error('Error fetching upcoming trips', e))
  }, [])

  return (
    <>
      <DashboardHeader upcomingTrips={upcomingTrips} />
      <Dashboard upcomingTrips={upcomingTrips} />
    </>
  )
}
