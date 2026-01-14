import { GeneralTask } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import TextField from '@mui/material/TextField'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Button from '@mui/material/Button'
import { useContext, useState } from 'react'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { updateTask } from '@/db/tasks'
import { TripContext } from '@/lib/utils/contexts/TripContext'

interface GeneralTaskViewProps {
  activeTask: GeneralTask | null
  closeView: () => void
}

const completeBtnSx = { position: 'absolute', left: '3rem', bottom: '3rem' }
const fullWidthSx = { width: '100%' }

export default function GeneralTaskView({ activeTask, closeView }: GeneralTaskViewProps) {
  if (!activeTask) return

  function getPayload() {
    return {
      task: {
        id: activeTask?.id,
        notes,
        completed: true
      }
    }
  }

  function markAsComplete() {
    if (!user || !trip) return

    updateTask({
      userId: user.id,
      tripId: trip.id,
      data: getPayload()
    })
      .catch((e) => {
        console.error(`Error marking task as complete`, e)
      })
      .finally(() => closeView())
  }

  const [notes, setNotes] = useState(activeTask.notes || '')

  const { user } = useContext(UserContext)
  const trip = useContext(TripContext)

  const editDisabled =
    activeTask.completed ||
    (activeTask.assigneeId !== user?.id && activeTask.creatorId !== user?.id)

  const assignee = activeTask.assignee

  return (
    <>
      <div className="flex italic space-x-4 my-2">
        <div>
          Assigned to {assignee.firstName} {assignee.lastName}
        </div>
        {activeTask.dueDate && <div>Due {dateFormatter(activeTask.dueDate)}</div>}
      </div>
      <div className="mb-8">{activeTask.description}</div>
      <TextField
        label="Notes"
        value={notes}
        multiline
        rows={4}
        onChange={(e) => {
          setNotes(e.target.value)
        }}
        sx={fullWidthSx}
        disabled={editDisabled}
      />
      {!editDisabled && (
        <Button
          startIcon={<CheckBoxRoundedIcon fontSize="small" />}
          variant="contained"
          onClick={markAsComplete}
          sx={completeBtnSx}>
          Mark as complete
        </Button>
      )}
    </>
  )
}
