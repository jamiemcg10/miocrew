'use client'

import { useState } from 'react'
import TabNav from './TabNav'
import Schedule from '@/lib/components/event/Schedule'
import Crew from '@/lib/components/crew/Crew'
import { trips } from '@/lib/utils/dummyData'
import TaskPage from '@/lib/components/tasks/TaskPage'

export default function TripPage() {
  const initialPage = +(localStorage.getItem('tab') || '0')
  const [page, setPage] = useState(initialPage)

  function renderPage() {
    switch (page) {
      case 0:
        return <Schedule />
      case 1:
        return <TaskPage />
      case 2:
        return <div>Planning</div>
      case 3:
        return <div>Expenses</div>
      case 4:
        return <Crew />
    }
  }

  return (
    <div className="relative h-full flex flex-col">
      <div
        className="my-4 font-bold text-3xl mx-4 pb-4 z-1 line-clamp-1 text-(--foreground) dark:text-[#90caf9] border-b-4 dark:border-b-[#90caf9]"
        style={{ borderStyle: 'double' }}>
        {trips[0].name}
      </div>
      <TabNav page={page} setPage={setPage} />
      {renderPage()}
    </div>
  )
}
