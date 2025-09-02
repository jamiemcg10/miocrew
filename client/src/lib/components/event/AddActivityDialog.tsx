import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useRef } from 'react'
import Dialog from '../Dialog'
import { DatePicker } from '@heroui/date-picker'
import { TimeInput } from '@heroui/date-input'
import { assignEventColor } from '@/lib/utils/assignColor'

interface AddActivityDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddActivityDialog({ open, setOpen }: AddActivityDialogProps) {
  function editActivity() {
    console.log(nameRef?.current?.value)
    console.log(descriptionRef?.current?.value)
    console.log(locationRef?.current?.value)
    console.log(startDateRef?.current?.value)
    console.log(startTimeRef?.current?.value)
    console.log(endDateRef?.current?.value)
    console.log(endTimeRef?.current?.value)
    console.log(assignEventColor())

    setOpen(false)
  }

  const nameRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const locationRef = useRef<HTMLInputElement | null>(null)
  const startDateRef = useRef<HTMLInputElement | null>(null)
  const startTimeRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)
  const endTimeRef = useRef<HTMLInputElement | null>(null)

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Activity</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Activity Name" required inputRef={nameRef} sx={{ mb: 2 }} />
        <TextField
          label="Activity Description"
          multiline
          rows={3}
          inputRef={descriptionRef}
          sx={{ mb: 2 }}
        />
        <TextField label="Location" inputRef={locationRef} sx={{ mb: 2 }} />
        <div className="flex mb-2">
          <DatePicker
            className="w-3/5"
            label="Start date"
            variant="bordered"
            size="sm"
            inputRef={startDateRef}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="Start time"
            variant="bordered"
            inputRef={startTimeRef}
          />
        </div>
        <div className="flex">
          <DatePicker
            className="w-3/5"
            label="End date"
            variant="bordered"
            size="sm"
            inputRef={endDateRef}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="End time"
            variant="bordered"
            inputRef={endTimeRef}
          />
        </div>
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }} onClick={editActivity}>
          Add Activity
        </Button>
      </form>
    </Dialog>
  )
}
