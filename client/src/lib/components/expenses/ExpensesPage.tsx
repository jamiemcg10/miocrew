import { useState, useEffect, useContext } from 'react'
import Expenses from './Expenses'
import AddExpenseDialog from './AddExpenseDialog'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { Expense } from '@/lib/types'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { getExpenses } from '@/db'

export default function TaskPage() {
  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState<boolean | Expense>(false)

  const storedExpenses = LocalStorage.get<Expense[]>(`${trip?.id}:expenses`)
  const [expenses, setExpenses] = useState<Expense[]>(storedExpenses || [])

  useEffect(() => {
    if (!user || !trip) return

    getExpenses({ userId: user.id, tripId: trip.id })
      .then((response) => {
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
          LocalStorage.set(`${trip?.id}:expenses`, response.data.expenses)
        }
      })
      .catch((e) => console.error('Error fetching expenses', e))
  }, [])

  if (!user || !trip) return

  return (
    <>
      <Expenses expenses={expenses} setAddDialogOpen={setAddDialogOpen} />
      <AddExpenseDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
