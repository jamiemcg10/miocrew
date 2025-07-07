import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import DialogPollOptions from './DialogPollOptions'
import Dialog from '../Dialog'
import { TripContext } from '@/lib/utils/TripContext'
import { User } from '@/lib/types'

interface CreateTaskDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

type TaskType = 'General' | 'Poll'

export default function CreateTaskDialog({ open, setOpen }: CreateTaskDialogProps) {
  const [type, setType] = useState<'General' | 'Poll' | ''>('')
  const [assignee, setAssignee] = useState<string>('')
  const trip = useContext(TripContext)

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Create new task</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Task Name" required sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Task Type</InputLabel>
          <Select
            label="Task Type"
            required
            value={type}
            onChange={(e) => {
              setType(e.target.value as TaskType)
            }}>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Poll">Poll</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Description" multiline rows={3} sx={{ mb: 2 }} />
        {type === 'Poll' ? (
          <DialogPollOptions />
        ) : type === 'General' ? (
          <FormControl>
            <InputLabel>Assignee</InputLabel>
            <Select
              label="Assignee"
              value={assignee}
              onChange={(e) => {
                setAssignee(e.target.value)
              }}>
              {trip?.attendees.map((a: User) => {
                return (
                  <MenuItem value={a.id} key={a.id}>
                    {a.firstName} {a.lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        ) : null}
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }}>
          Create Task
        </Button>
      </form>
    </Dialog>
  )
}
