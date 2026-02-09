'use client'

import DashboardHeader from './DashboardHeader'
import Dashboard from './Dashboard'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { Trip } from '@/lib/types'
import { getTrips } from '@/db'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import dayjs from 'dayjs'

const today = dayjs().startOf('day')

export default function DashboardPage() {
  const { user } = useContext(UserContext)

  const storedTrips = LocalStorage.get<Trip[]>('upcoming-trips')

  const [upcomingTrips, setUpcomingTrips] = useState<Trip[] | undefined>(storedTrips || undefined)

  let tripRefreshInterval: NodeJS.Timeout

  function fetchTrips() {
    getTrips({ userId: user!.id })
      .then((response) => {
        const _upcomingTrips = response.data.trips.filter((trip: Trip) => {
          return !dayjs(trip.endDate).isBefore(today)
        })
        setUpcomingTrips(_upcomingTrips)
        LocalStorage.set('upcoming-trips', _upcomingTrips)
        tripRefreshInterval = setInterval(fetchTrips, 30000)
      })
      .catch((e) => console.error('Error fetching upcoming trips', e))
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      clearInterval(tripRefreshInterval)
    } else {
      fetchTrips()
    }
  }

  useEffect(() => {
    fetchTrips()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(tripRefreshInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user])

  return (
    <>
      <DashboardHeader upcomingTrips={upcomingTrips} />
      <Dashboard upcomingTrips={upcomingTrips} />
    </>
  )
}
