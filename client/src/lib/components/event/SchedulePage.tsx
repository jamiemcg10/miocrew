import Schedule from '@/lib/components/event/Schedule'
import { useState } from 'react'
import AddEventDialog from './AddEventDialog'

export default function TaskPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <>
      <Schedule setOpenAddDialog={setAddDialogOpen} />
      <AddEventDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
