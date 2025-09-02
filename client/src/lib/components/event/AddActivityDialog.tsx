import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useRef } from 'react'
import Dialog from '../Dialog'
import { DatePicker } from '@heroui/date-picker'
import { TimeInput } from '@heroui/date-input'
import { assignEventColor } from '@/lib/utils/assignColor'
import { Activity } from '@/lib/types'
import { TripContext } from '@/lib/utils/TripContext'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'

interface AddActivityDialogProps {
  open: boolean | Activity
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddActivityDialog({ open, setOpen }: AddActivityDialogProps) {
  function isActivity(open: boolean | Activity): open is Activity {
    return typeof open !== 'boolean'
  }

  function getPayload() {
    return {
      trip_id: trip?.id,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      location: locationRef.current?.value,
      start_time: `${startDateRef?.current?.value} ${startTimeRef?.current?.value || ''}`,
      end_time: endDateRef?.current?.value
        ? `${endDateRef?.current?.value} ${endTimeRef?.current?.value || ''}`
        : null,
      color: isActivity(open) ? open.color : assignEventColor()
    } as Partial<Activity>
  }

  function saveActivity() {
    if (!nameRef.current?.value || !startDateRef?.current?.value || !startTimeRef?.current?.value) {
      return
    }

    const payload = getPayload()

    const requestUrl = `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/activities/create`

    axios({
      method: isActivity(open) ? 'patch' : 'post',
      url: requestUrl,
      data: payload,
      withCredentials: true
    })
      .catch((e) => {
        console.error(`Error ${isActivity(open) ? 'editing' : 'adding'} activity`, e)
      })
      .finally(() => {
        setOpen(false)
      })
  }

  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const locationRef = useRef<HTMLInputElement | null>(null)
  const startDateRef = useRef<HTMLInputElement | null>(null)
  const startTimeRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)
  const endTimeRef = useRef<HTMLInputElement | null>(null)

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Activity</DialogTitle>
      <div className="flex flex-col m-10">
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
            isRequired
            inputRef={startDateRef}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="Start time"
            variant="bordered"
            isRequired
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
        <Button
          variant="contained"
          type="submit"
          sx={{ fontWeight: 700, mt: 5 }}
          onClick={saveActivity}>
          Save Activity
        </Button>
      </div>
    </Dialog>
  )
}
