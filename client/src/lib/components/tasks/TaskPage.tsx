import Tasks from '@/lib/components/tasks/Tasks'
import { useState } from 'react'
import CreateTaskDialog from './CreateTaskDialog'

export default function TaskPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  return (
    <>
      <Tasks setOpenCreateDialog={setCreateDialogOpen} />
      <CreateTaskDialog open={createDialogOpen} setOpen={setCreateDialogOpen} />
    </>
  )
}
