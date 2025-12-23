'use client'

import { useContext, useEffect, useState } from 'react'
import TabNav from './TabNav'
import SchedulePage from '@/lib/components/activity/SchedulePage'
import CrewPage from '@/lib/components/crew/CrewPage'
import TasksPage from '@/lib/components/tasks/TasksPage'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import IdeasPage from '@/lib/components/ideas/IdeasPage'
import ExpensesPage from '@/lib/components/expenses/ExpensesPage'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { CrewMember, Trip } from '@/lib/types'
import { getTrip } from '@/db'
import { addMessageListener, openWebSocket, websocket } from '@/db/websocket'
import TripWrapper from './TripWrapper'

export default function TripPage() {
  const { user } = useContext(UserContext)
  const [trip, setTrip] = useState<Trip | null>(null)

  const { tripid } = useParams<{ tripid: string }>()

  const initialPage = localStorage.getItem('tab') || 'schedule'
  const [page, setPage] = useState(initialPage)

  function fetchTrip() {
    getTrip({ userId: user!.id, tripId: tripid })
      .then((response) => {
        const attendees = response.data.trip.attendees.reduce(
          (acc: Record<string, CrewMember>, c: CrewMember) => {
            return {
              ...acc,
              [c.attendeeId]: c
            }
          },
          {}
        )

        if (response.data.trip) {
          setTrip({ ...response.data.trip, attendees })
          !websocket && openWebSocket(tripid)
        } else {
          notFound()
        }
      })
      .catch((e) => console.error('Error getching trip', e))
  }

  function renderPage() {
    switch (page) {
      case 'schedule':
        return <SchedulePage />
      case 'tasks':
        return <TasksPage />
      case 'ideas':
        return <IdeasPage />
      case 'expenses':
        return <ExpensesPage />
      case 'crew':
        return <CrewPage />
    }
  }

  useEffect(() => {
    if (!user) return

    fetchTrip()
    addMessageListener('trip', fetchTrip)
  }, [user])

  if (!trip) return

  return (
    <div className="relative overflow-hidden flex flex-col grow">
      <div
        className="my-4 shrink-0 font-bold text-3xl mx-4 pb-4 z-1 text-(--dk-blue) dark:!text-(--lt-blue) border-b-4 !border-b-(--dk-blue) dark:!border-b-(--lt-blue)"
        style={{ borderStyle: 'double' }}>
        <div className="line-clamp-1">{trip.name}</div>
      </div>
      <TabNav page={page} setPage={setPage} />
      <div className="py-8 px-8 sm:px-16 sm:py-4 flex flex-col overflow-y-hidden font-bold space-y-4 grow">
        <TripContext value={trip}>
          <TripWrapper tripId={trip.id}>{renderPage()}</TripWrapper>
        </TripContext>
      </div>
    </div>
  )
}
