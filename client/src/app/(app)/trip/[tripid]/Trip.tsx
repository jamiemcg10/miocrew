import { Expense, Idea } from '@/lib/types'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getExpenses } from '@/db'
import { addMessageListener } from '@/db/websocket'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'

interface TripProps {
  tripId: string
  children: ReactNode
}

// START: try to move all db and ws logic here

export const IdeasContext = createContext<Idea[]>([])
export const ExpensesContext = createContext<Expense[]>([])

export default function TripWrapper({ tripId, children }: TripProps) {
  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const storedIdeas = LocalStorage.get<Idea[]>(`${tripId}:ideas`)
  const storedExpenses = LocalStorage.get<Expense[]>(`${trip?.id}:expenses`)

  const [expenses, setExpenses] = useState<Expense[]>(storedExpenses || [])

  function fetchExpenses() {
    if (!user || !trip) return

    getExpenses({ userId: user.id, tripId: trip.id })
      .then((response) => {
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
          LocalStorage.set(`${trip?.id}:expenses`, response.data.expenses)
        }
      })
      .catch((e) => console.error('Error fetching expenses', e))
  }

  useEffect(() => {
    fetchExpenses()

    addMessageListener('expenses', fetchExpenses)
  }, [])

  return (
    <>
      <IdeasContext value={storedIdeas || []}>
        <ExpensesContext value={expenses}>{children}</ExpensesContext>
      </IdeasContext>
    </>
  )
}
