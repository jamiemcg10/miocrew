'use client'

import { useState } from 'react'
import TabNav from './TabNav'

export default function TripPage() {
  const [page, setPage] = useState(0)

  function renderPage() {
    switch (page) {
      case 0:
        return <div>Schedule</div>
      case 1:
        return <div>Tasks</div>
      case 2:
        return <div>Planning</div>
      case 3:
        return <div>Expenses</div>
    }
  }

  return (
    <div>
      <TabNav page={page} setPage={setPage} />
      {renderPage()}
    </div>
  )
}
