'use client'

import { useState } from 'react'
import TabNav from './TabNav'
import SchedulePage from '@/lib/components/event/SchedulePage'
import CrewPage from '@/lib/components/crew/CrewPage'
import { trips } from '@/lib/utils/dummyData'
import TaskPage from '@/lib/components/tasks/TaskPage'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function TripPage() {
  const { tripid } = useParams<{ tripid: string }>()

  const trip = trips.find((trip) => trip.id === tripid)
  if (!trip) {
    notFound()
  }

  const initialPage = +(localStorage.getItem('tab') || '0')
  const [page, setPage] = useState(initialPage)

  function renderPage() {
    switch (page) {
      case 0:
        return <SchedulePage />
      case 1:
        return <TaskPage />
      case 2:
        return <div>Planning</div>
      case 3:
        return <div>Expenses</div>
      case 4:
        return <CrewPage />
    }
  }

  return (
    <div className="relative h-full flex flex-col">
      <div
        className="my-4 font-bold text-3xl mx-4 pb-4 z-1 line-clamp-1 text-(--foreground) dark:text-[#90caf9] border-b-4 dark:border-b-[#90caf9]"
        style={{ borderStyle: 'double' }}>
        {trip.name}
      </div>
      <TabNav page={page} setPage={setPage} />
      <div className="py-8 px-8 sm:px-16 sm:py-4 flex flex-col overflow-y-hidden font-bold space-y-4 grow">
        {renderPage()}
      </div>
    </div>
  )
}
