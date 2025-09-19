import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useRef } from 'react'
import Dialog from '../Dialog'
import { DatePicker } from '@heroui/date-picker'
import { TimeInput } from '@heroui/date-input'
import { assignActivityColor } from '@/lib/utils/colors/assignColor'
import { Activity } from '@/lib/types'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import axios from 'axios'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { CalendarDate, parseDate, parseTime, Time } from '@internationalized/date'

interface AddActivityDialogProps {
  open: boolean | Activity
  setOpen: Dispatch<SetStateAction<boolean | Activity>>
}

export default function AddActivityDialog({ open, setOpen }: AddActivityDialogProps) {
  function isActivity(open: boolean | Activity): open is Activity {
    return typeof open !== 'boolean'
  }

  function getPayload() {
    const payload = {
      trip_id: trip?.id,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      location: locationRef.current?.value,
      start_time: `${startDateRef?.current?.value}T${startTimeRef?.current?.value || ''}`,
      end_time: endDateRef?.current?.value
        ? `${endDateRef?.current?.value}` +
          (endTimeRef?.current?.value ? `T${endTimeRef?.current?.value}` : '')
        : null,
      color: isActivity(open) ? open.color : assignActivityColor()
    } as Partial<Activity>

    if (isActivity(open)) {
      payload.id = open.id
    }

    return payload
  }

  function saveActivity() {
    if (!nameRef.current?.value || !startDateRef?.current?.value || !startTimeRef?.current?.value) {
      return
    }

    // TODO: Make sure end time and date is after start time and date

    const payload = getPayload()

    const requestUrl = isActivity(open)
      ? `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/activity/update`
      : `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/activities/create`

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

  function getDefaultValue(prop: keyof Activity | 'startDate' | 'endDate' | 'endTime') {
    if (!isActivity(open)) return undefined
    // TODO: end date is start date if not specified, end must be after start

    if (prop === 'startDate') {
      const [date, _time] = open['startTime'].split('T')
      return date ? parseDate(date) : undefined
    } else if (prop === 'startTime') {
      const [_date, time] = open['startTime'].split('T')
      return time ? parseTime(time) : undefined
    } else if (prop === 'endDate') {
      const [date, _time] = (open['endTime'] || '').split('T')
      return date ? parseDate(date) : undefined
    } else if (prop === 'endTime') {
      const [_date, time] = (open['endTime'] || '').split('T')
      return time ? parseTime(time) : undefined
    }

    return open[prop] ? open[prop] : undefined
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
        <TextField
          label="Activity Name"
          required
          inputRef={nameRef}
          defaultValue={getDefaultValue('name')}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Activity Description"
          multiline
          rows={3}
          inputRef={descriptionRef}
          defaultValue={getDefaultValue('description')}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          inputRef={locationRef}
          defaultValue={getDefaultValue('location')}
          sx={{ mb: 2 }}
        />
        <div className="flex mb-2">
          <DatePicker
            className="w-3/5"
            label="Start date"
            variant="bordered"
            size="sm"
            isRequired
            inputRef={startDateRef}
            defaultValue={getDefaultValue('startDate') as CalendarDate}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="Start time"
            variant="bordered"
            isRequired
            inputRef={startTimeRef}
            defaultValue={getDefaultValue('startTime') as Time}
          />
        </div>
        <div className="flex">
          <DatePicker
            className="w-3/5"
            label="End date"
            variant="bordered"
            size="sm"
            inputRef={endDateRef}
            defaultValue={getDefaultValue('endDate') as CalendarDate}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="End time"
            variant="bordered"
            inputRef={endTimeRef}
            defaultValue={getDefaultValue('endTime') as Time}
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
