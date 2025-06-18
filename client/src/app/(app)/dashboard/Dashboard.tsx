'use client'

import { Button } from '@mui/material'

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <Button
        href="/create"
        color="secondary"
        variant="contained"
        sx={{ margin: '16px', alignSelf: 'end', width: 'initial' }}>
        Create trip
      </Button>
      <div>Dashboard</div>
    </div>
  )
}
