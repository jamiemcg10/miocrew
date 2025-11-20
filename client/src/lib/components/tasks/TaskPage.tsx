import Tasks from '@/lib/components/tasks/Tasks'
import { useState } from 'react'
import CreateTaskDialog from './CreateTaskDialog'
import { Task } from '@/lib/types'

export default function TaskPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean | Task>(false)

  return (
    <>
      <Tasks setOpenCreateDialog={setCreateDialogOpen} />
      <CreateTaskDialog open={createDialogOpen} setOpen={setCreateDialogOpen} />
    </>
  )
}
