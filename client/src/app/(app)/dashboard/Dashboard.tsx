'use client'

import TripTable from '@/lib/components/TripTable'
import { Trip } from '@/lib/types'
import { Button } from '@mui/material'

// dummy data
const trips = [
  {
    id: '1',
    name: 'Wine Moms Take on Napa',
    attendees: [
      { id: '1', name: 'Jane Fonda', color: 'purple' }, // color should really be their avatar
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '3', name: 'Jamie Lynn Curtis', color: 'turquoise' }
    ],
    startDate: new Date('August 5, 2026'),
    endDate: new Date('August 12, 2026')
  },
  {
    id: '2',
    name: 'Streep Family Vacation',
    attendees: [
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '4', name: 'Dustin Streep', color: 'teal' },
      { id: '5', name: 'Luca Streep', color: 'pink' },
      { id: '6', name: 'Astro Streep', color: 'navy' }
    ],
    startDate: new Date('December 24, 2026'),
    endDate: new Date('January 2, 2027')
  },
  {
    id: '3',
    name: 'Monster Jam',
    attendees: [
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '4', name: 'Dustin Streep', color: 'teal' },
      { id: '5', name: 'Luca Streep', color: 'pink' },
      { id: '6', name: 'Astro Streep', color: 'navy' },
      { id: '7', name: 'Johnny Walker', color: 'green' },
      { id: '8', name: 'Jim Beam', color: 'red' },
      { id: '9', name: 'Jack Daniels', color: 'black' }
    ],
    startDate: new Date('October 4, 2025')
  }
] as Trip[]

export default function Dashboard() {
  return (
    <div className="flex flex-col px-4">
      <Button
        href="/create"
        color="secondary"
        variant="contained"
        sx={{ margin: '16px 0 16px 0', alignSelf: 'end', width: 'initial' }}>
        Create trip
      </Button>
      <div className="text-xl font-bold mb-4">Upcoming trips</div>
      <TripTable trips={trips} />
      <div className="text-xl font-bold mb-4">Action items</div>
      <div>You have no action items right now</div>
    </div>
  )
}
