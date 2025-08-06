'use client'

import TripTable from '@/lib/components/TripTable'
import Button from '@mui/material/Button'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ActionItems from './ActionItems'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Trip } from '@/lib/types'

export default function Dashboard() {
  const user = useContext(UserContext)
  const [upcomingTrips, setUpcomingTrips] = useState([])

  function getUpcomingTrips() {
    axios
      .get(`http://localhost:8000/users/${user!.id}/trips`) // get address from env
      .then((response) => {
        const _upcomingTrips = response.data.trips.filter((trip: Trip) => {
          const startDate = new Date(trip.startDate)
          return startDate >= new Date()
        })
        setUpcomingTrips(_upcomingTrips)
      })
      .catch(console.error)
  }

  useEffect(getUpcomingTrips, [])

  if (!user) return

  return (
    <div className="flex flex-col px-4">
      <Button
        href="/create"
        color="secondary"
        variant="contained"
        startIcon={<AddRoundedIcon />}
        sx={{
          margin: '16px 0 16px 0',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600
        }}>
        Create trip
      </Button>
      <TripTable trips={upcomingTrips} title="Upcoming trips" />
      <ActionItems />
    </div>
  )
}
