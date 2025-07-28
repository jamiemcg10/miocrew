import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'
import { DatePicker } from '@heroui/date-picker'
import { TimeInput } from '@heroui/date-input'

interface AddEventDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddEventDialog({ open, setOpen }: AddEventDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Event</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Event Name" required sx={{ mb: 2 }} />
        <TextField label="Event Description" multiline rows={3} sx={{ mb: 2 }} />
        <TextField label="Location" required sx={{ mb: 2 }} />
        <div className="flex mb-2">
          <DatePicker className="w-3/5" label="Start date" variant="bordered" size="sm" />
          <TimeInput className="w-2/5 ml-2" label="Start time" variant="bordered" />
        </div>
        <div className="flex">
          <DatePicker className="w-3/5" label="End date" variant="bordered" size="sm" />
          <TimeInput className="w-2/5 ml-2" label="End time" variant="bordered" />
        </div>
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }}>
          Add Event
        </Button>
      </form>
    </Dialog>
  )
}
