import { useState } from 'react'
import Expenses from './Expenses'
import AddExpenseDialog from './AddExpenseDialog'

export default function TaskPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <>
      <Expenses setOpenAddDialog={setAddDialogOpen} />
      <AddExpenseDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
