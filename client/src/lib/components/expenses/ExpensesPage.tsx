import { useState, useContext } from 'react'
import Expenses from './Expenses'
import ExpenseDialog from './ExpenseDialog'
import { Expense } from '@/lib/types'
import { ExpensesContext } from '@/app/(app)/trip/[tripid]/TripWrapper'

export default function TaskPage() {
  const expenses = useContext(ExpensesContext)
  const [addDialogOpen, setAddDialogOpen] = useState<boolean | Expense>(false)

  return (
    <>
      <Expenses expenses={expenses} setAddDialogOpen={setAddDialogOpen} />
      <ExpenseDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
