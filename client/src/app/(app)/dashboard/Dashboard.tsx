'use client'

import TripTable from '@/lib/components/TripTable'
import { trips } from '@/lib/utils/dummyData'
import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ActionItems from './ActionItems'

export default function Dashboard() {
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
      <TripTable trips={trips} title="Upcoming trips" />
      <ActionItems />
    </div>
  )
}
