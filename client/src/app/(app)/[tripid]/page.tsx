'use client'

import { useState } from 'react'
import TabNav from './TabNav'
import Schedule from '@/lib/components/event/Schedule'
import Crew from '@/lib/components/crew/Crew'

export default function TripPage() {
  const initialPage = +(localStorage.getItem('tab') || '0')
  const [page, setPage] = useState(initialPage)

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
      case 4:
        return <Crew />
    }
  }

  return (
    <div className="h-full flex flex-col">
      <TabNav page={page} setPage={setPage} />
      {renderPage()}
    </div>
  )
}
