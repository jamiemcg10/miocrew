'use client'

import TripTable from '@/lib/components/TripTable'
import Button from '@mui/material/Button'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ActionItems from './ActionItems'
import { Trip } from '@/lib/types'

interface DashboardProps {
  upcomingTrips: Trip[]
}

export default function Dashboard({ upcomingTrips }: DashboardProps) {
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
