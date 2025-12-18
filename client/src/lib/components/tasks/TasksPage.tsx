import Tasks from '@/lib/components/tasks/Tasks'
import { useState } from 'react'
import TaskDialog from './TaskDialog'
import { Task } from '@/lib/types'

export default function TaskPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean | Task>(false)

  return (
    <>
      <Tasks setOpenCreateDialog={setCreateDialogOpen} />
      <TaskDialog open={createDialogOpen} setOpen={setCreateDialogOpen} />
    </>
  )
}
