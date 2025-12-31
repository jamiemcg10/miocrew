'use client'

import TripTable from '@/lib/components/TripTable'
import Button from '@mui/material/Button'
import CardTravelRoundedIcon from '@mui/icons-material/CardTravelRounded'
import ActionItems from './ActionItems'
import { Trip } from '@/lib/types'

interface DashboardProps {
  upcomingTrips: Trip[]
}

const buttonSx = { margin: '16px 0 16px 0', alignSelf: 'end', width: 'initial', fontWeight: 600 }

export default function Dashboard({ upcomingTrips }: DashboardProps) {
  return (
    <div className="flex flex-col px-4 overflow-y-auto">
      <Button
        href="/create"
        color="info"
        variant="contained"
        startIcon={<CardTravelRoundedIcon />}
        sx={buttonSx}>
        Create trip
      </Button>
      <TripTable trips={upcomingTrips} title="Upcoming trips" />
      <br />
      <ActionItems />
    </div>
  )
}
