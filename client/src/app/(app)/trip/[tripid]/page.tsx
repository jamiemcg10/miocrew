'use client'

import { useState } from 'react'
import TabNav from './TabNav'
import SchedulePage from '@/lib/components/event/SchedulePage'
import CrewPage from '@/lib/components/crew/CrewPage'
import { trips } from '@/lib/utils/dummyData'
import TaskPage from '@/lib/components/tasks/TaskPage'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { TripContext } from '@/lib/utils/TripContext'
import IdeasPage from '@/lib/components/ideas/IdeasPage'
import ExpensesPage from '@/lib/components/expenses/ExpensesPage'

export default function TripPage() {
  const { tripid } = useParams<{ tripid: string }>()

  const trip = trips.find((trip) => trip.id === tripid)
  if (!trip) {
    notFound()
  }

  const initialPage = localStorage.getItem('tab') || 'schedule'
  const [page, setPage] = useState(initialPage)

  function renderPage() {
    switch (page) {
      case 'schedule':
        return <SchedulePage />
      case 'tasks':
        return <TaskPage />
      case 'planning':
        return <IdeasPage />
      case 'expenses':
        return <ExpensesPage />
      case 'crew':
        return <CrewPage />
    }
  }

  return (
    <div className="relative overflow-hidden flex flex-col grow">
      <div
        className="my-4 shrink-0 font-bold text-3xl mx-4 pb-4 z-1 line-clamp-1 text-(--dk-blue) dark:!text-(--lt-blue) border-b-4 !border-b-(--dk-blue) dark:!border-b-(--lt-blue)"
        style={{ borderStyle: 'double' }}>
        {trip.name}
      </div>
      <TabNav page={page} setPage={setPage} />
      <div className="py-8 px-8 sm:px-16 sm:py-4 flex flex-col overflow-y-hidden font-bold space-y-4 grow">
        <TripContext value={trip}>{renderPage()}</TripContext>
      </div>
    </div>
  )
}
