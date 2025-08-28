import { useState, useEffect, useContext } from 'react'
import Expenses from './Expenses'
import AddExpenseDialog from './AddExpenseDialog'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'
import { Expense } from '@/lib/types'
import { LocalStorage } from '@/lib/utils/LocalStorage'

export default function TaskPage() {
  function getExpenses() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trip/${trip!.id}/expenses/`, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
          LocalStorage.set(`${trip?.id}:expenses`, response.data.expenses)
        }
      })
      .catch((e) => console.error('Error fetching expenses', e))
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const storedExpenses = LocalStorage.get<Expense[]>(`${trip?.id}:expenses`)
  const [expenses, setExpenses] = useState<Expense[]>(storedExpenses || [])

  useEffect(() => {
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
