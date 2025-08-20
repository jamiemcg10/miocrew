import { useState, useEffect, useContext } from 'react'
import Expenses from './Expenses'
import AddExpenseDialog from './AddExpenseDialog'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'
import { Expense } from '@/lib/types'
import { arrayToObject } from '@/lib/utils/arrayToObject'

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
        }
      })
      .catch(console.error)
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [expenses, setExpenses] = useState([])

  useEffect(getExpenses, [])

  if (!user || !trip) return

  return (
    <>
      <Expenses expenses={expenses} setOpenAddDialog={setAddDialogOpen} />
      <AddExpenseDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
