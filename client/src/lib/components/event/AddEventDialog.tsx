import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

interface CreateTaskDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateTaskDialog({ open, setOpen }: CreateTaskDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Event</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Event Name" required sx={{ mb: 2 }} />
        <TextField label="Event Description" multiline rows={3} sx={{ mb: 2 }} />
        <TextField label="Location" required sx={{ mb: 2 }} />
        <div className="flex mb-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Start date" sx={{ width: '60%' }} disablePast />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Start time" sx={{ width: '40%', ml: 2 }} />
          </LocalizationProvider>
        </div>
        <div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="End date" sx={{ width: '60%' }} disablePast />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="End time" sx={{ width: '40%', ml: 2 }} />
          </LocalizationProvider>
        </div>
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }}>
          Add Event
        </Button>
      </form>
    </Dialog>
  )
}
