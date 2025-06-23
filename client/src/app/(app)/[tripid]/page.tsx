'use client'

import { useState } from 'react'
import TabNav from './TabNav'
import Schedule from '@/lib/components/event/Schedule'

export default function TripPage() {
  const [page, setPage] = useState(0)

  function renderPage() {
    switch (page) {
      case 0:
        return <Schedule />
      case 1:
        return <div>Tasks</div>
      case 2:
        return <div>Planning</div>
      case 3:
        return <div>Expenses</div>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <TabNav page={page} setPage={setPage} />
      {renderPage()}
    </div>
  )
}
