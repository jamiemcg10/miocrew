import { useState, useEffect, useContext } from 'react'
import Expenses from './Expenses'
import AddExpenseDialog from './AddExpenseDialog'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'
import { Expense } from '@/lib/types'
import { arrayToObject } from '@/lib/utils/arrayToObject'
import { LocalStorage } from '@/lib/utils/LocalStorage'

export default function TaskPage() {
  function getExpenses() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trip/${trip!.id}/expenses/`)
      .then((response) => {
        if (response.data.expenses) {
          const expenses = response.data.expenses
          expenses.map((expense: Expense) => {
            return {
              ...expense,
              owes: expense.owe.reduce(arrayToObject, {})
            }
          })
          setExpenses(response.data.expenses)
          LocalStorage.set('expenses', response.data.expenses)
        }
      })
      .catch((e) => console.error('Error fetching expenses', e))
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const storedExpenses = LocalStorage.get<Expense[]>('expenses')
    if (storedExpenses) {
      setExpenses(storedExpenses)
    }

    getExpenses()
  }, [])

  if (!user || !trip) return

  return (
    <>
      <Expenses expenses={expenses} setOpenAddDialog={setAddDialogOpen} />
      <AddExpenseDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
