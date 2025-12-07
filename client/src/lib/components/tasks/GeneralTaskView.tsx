import { GeneralTask, User } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import TextField from '@mui/material/TextField'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Button from '@mui/material/Button'
import { useRef } from 'react'

interface GeneralTaskViewProps {
  activeTask: GeneralTask | null
}

const completeBtnSx = { position: 'absolute', left: '3rem', bottom: '3rem' }
const fullWidthSx = { width: '100%' }

export default function GeneralTaskView({ activeTask }: GeneralTaskViewProps) {
  const notesRef = useRef(null)

  return (
    <>
      <div className="flex italic space-x-4 my-2">
        <div>
          Assigned to {(activeTask?.assignee as User)?.firstName}{' '}
          {(activeTask?.assignee as User)?.lastName}
        </div>
        <div>Due {dateFormatter(activeTask?.dueDate)}</div>
      </div>
      <div className="mb-8">{activeTask?.description}</div>
      {/* TODO: Only let assignee edit notes */}
      <TextField
        label="Notes"
        defaultValue={activeTask?.notes}
        multiline
        rows={4}
        ref={notesRef}
        sx={fullWidthSx}
        disabled={activeTask?.completed}
      />
      <Button
        startIcon={<CheckBoxRoundedIcon fontSize="small" />}
        variant="contained"
        sx={completeBtnSx}>
        Mark as complete
      </Button>
    </>
  )
}
