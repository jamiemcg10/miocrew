import Schedule from '@/lib/components/event/Schedule'
import { useState } from 'react'
import AddActivityDialog from './AddActivityDialog'

export default function TaskPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <>
      <Schedule setOpenAddDialog={setAddDialogOpen} />
      <AddActivityDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
