import { GeneralTask } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import TextField from '@mui/material/TextField'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Button from '@mui/material/Button'
import { useRef } from 'react'

interface GeneralTaskViewProps {
  activeTask: GeneralTask | null
}

export default function GeneralTaskView({ activeTask }: GeneralTaskViewProps) {
  const notesRef = useRef(null)

  if (!activeTask) return

  const assignee = activeTask.assignee

  return (
    <>
      <div className="flex italic space-x-4 my-2">
        <div>
          Assigned to {assignee.firstName} {assignee.lastName}
        </div>
        <div>Due {dateFormatter(activeTask.dueDate)}</div>
      </div>
      <div className="mb-8">{activeTask.description}</div>
      {/* TODO: Only let assignee edit notes */}
      <TextField
        label="Notes"
        defaultValue={activeTask.notes}
        multiline
        rows={4}
        ref={notesRef}
        sx={{ width: '100%' }}
        disabled={activeTask.completed}
      />
      <Button
        startIcon={<CheckBoxRoundedIcon fontSize="small" />}
        variant="contained"
        sx={{ position: 'absolute', left: '3rem', bottom: '3rem' }}>
        Mark as complete
      </Button>
    </>
  )
}
