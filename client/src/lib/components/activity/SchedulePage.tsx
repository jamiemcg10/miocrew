import Schedule from '@/lib/components/activity/Schedule'
import { useState } from 'react'
import AddActivityDialog from './AddActivityDialog'
import { Activity } from '@/lib/types'
import { ScheduleContext } from '@/lib/utils/contexts/ScheduleContext'

export default function TaskPage() {
  function onEditActivity(activity: Activity) {
    setAddDialogOpen(activity)
  }

  const [addDialogOpen, setAddDialogOpen] = useState<boolean | Activity>(false)
  return (
    <ScheduleContext value={{ onEdit: onEditActivity }}>
      <Schedule setOpenAddDialog={setAddDialogOpen} />
      <AddActivityDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </ScheduleContext>
  )
}
